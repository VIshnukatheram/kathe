using Microsoft.AspNetCore.Http;
using OfficeOpenXml;

namespace FG_STModels.BL.Service
{
    public class ExcelFileService
    {
        private List<T> ReadExcelData<T>(Stream stream) where T : new()
        {

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage(stream))
            {
                var worksheet = package.Workbook.Worksheets[0];
                var rowCount = worksheet.Dimension.Rows;
                var columnCount = worksheet.Dimension.Columns;

                List<T> excelData = new List<T>();

                for (int row = 2; row <= rowCount; row++)
                {
                    var rowData = new T();

                    for (int col = 1; col <= columnCount; col++)
                    {
                        var header = worksheet.Cells[1, col].Value?.ToString() ?? "";
                        var value = worksheet.Cells[row, col].Value;
                        if(header != "" && value != null)
                        {
                            var propertyName = MapExcelHeaderToPropertyName(header);
                            var property = typeof(T).GetProperty(propertyName);
                            if (property != null)
                            {
                                var convertedValue = Convert.ChangeType(value, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
                                property.SetValue(rowData, convertedValue);
                            }
                        }
                    }
                    excelData.Add(rowData);
                }

                return excelData;
            }
        }

        private string MapExcelHeaderToPropertyName(string excelHeader)
        {
            if (excelHeader != null)
            {
                return excelHeader.Replace(" ", "").Replace("(", "").Replace(")", "");
            }
            return excelHeader ?? "";
        }

        /// <summary>
        /// Get List Of Excel Records that reads form Excel File
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="file">Excel File</param>
        /// <returns>List of Excel Records</returns>
        public List<T> GetListOfExcelRecords<T>(IFormFile file) where T : new()
        {
            using (var foreClosureStream = file.OpenReadStream())
            {
                foreClosureStream.Seek(0, SeekOrigin.Begin);
                var foreClosureData = ReadExcelData<T>(foreClosureStream);
                return foreClosureData.ToList();
            }
        }
    }
}
