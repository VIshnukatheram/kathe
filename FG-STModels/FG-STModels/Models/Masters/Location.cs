using FG_STModels.Data;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace FG_STModels.Models.Masters
{
    public enum SearchLocationBy
    {
        State = 0,
        District = 1,
        City = 2,
        Village = 3,
        PinCode = 4
    }
    [Table("MASTERS.State")]
    public class State
    {
        [Key]
        public int StateID { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        public List<District> ?Districts { get; set; }
    }
    [Table("MASTERS.District")]
    public class District
    {
        [Key]
        public int DistrictId { get; set; }
        public int ?StateID { get; set; }
        [ForeignKey("StateID")]
        public State ?State { get; set; }
        [MaxLength(50)]
        public string DistrictName { get; set; }
        public List<City> ?Cities { get; set; }
    }
    [Table("MASTERS.City")]
    public class City
    {
        [Key]
        public int CityId { get; set; }
        public int ?DistrictId { get; set; }
        [ForeignKey("DistrictId")]
        public District ?District { get; set; }
        [MaxLength(50)]
        public string CityName { get; set; }
        public List<Village> ?Villages { get; set; }
    }
    [Table("MASTERS.Village")]
    public class Village
    {
        [Key]
        public int VillageId { get; set; }

        public int ?CityId { get; set; }

        [ForeignKey("CityId")]
        public City? City { get; set; }

        [MaxLength(200)]
        public string? VillageName { get; set; }
    }
    [Table("MASTERS.Pincode")]
    public class PostalCode
    {
        [Key]
        public int PincodeId { get; set; }
        public int ?VillageId { get; set; }
        [ForeignKey("VillageId")]
        public Village ?Village { get; set; }
        [MaxLength(50)]
        public string PostalName { get; set; }
        public long Pincode { get; set; }
    }
    public class Search
    {
        private FGDBContext FGDBContext = new FGDBContext(Environment.GetEnvironmentVariable("SQLConnectionString"));
        public SearchLocationBy searchLocationBy { get; set; }
        public PostalCode postalCode { get; set; }
        public PostalCode FindLocationByPinCode(PostalCode Pincode)
        {
            PostalCode postalCode = null;
            try
            {
                postalCode = FGDBContext.PostalCodes.AsNoTracking().AsParallel().Where(x => x.Pincode == Pincode.Pincode).FirstOrDefault();
                Village _Village = FGDBContext.Villages.AsNoTracking().AsParallel().Where(x => x.VillageId == postalCode.VillageId).FirstOrDefault();
                City _City = FGDBContext.Cities.AsNoTracking().AsParallel().Where(x => x.CityId == _Village.CityId).FirstOrDefault();
                District _District = FGDBContext.Districts.AsNoTracking().AsParallel().Where(x => x.DistrictId == _City.DistrictId).FirstOrDefault();
                State _State = FGDBContext.States.AsNoTracking().AsParallel().Where(x => x.StateID == _District.StateID).FirstOrDefault();
                postalCode.Village = _Village;
                postalCode.Village.City = _City;
                postalCode.Village.City.District = _District;
                postalCode.Village.City.District.State = _State;

            }
            catch (ArgumentNullException)
            {
                //No match found move to next
            }
            return postalCode;
        }
    }
}