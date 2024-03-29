/****** Object:  Schema [APPLOGS]    Script Date: 06-12-2023 12:25:45 ******/
CREATE SCHEMA [APPLOGS]
GO
/****** Object:  Schema [COMMS]    Script Date: 06-12-2023 12:25:45 ******/
CREATE SCHEMA [COMMS]
GO
/****** Object:  Schema [Core]    Script Date: 06-12-2023 12:25:45 ******/
CREATE SCHEMA [Core]
GO
/****** Object:  Schema [FISS]    Script Date: 06-12-2023 12:25:45 ******/
CREATE SCHEMA [FISS]
GO
/****** Object:  Schema [LifeAsiaObj]    Script Date: 06-12-2023 12:25:45 ******/
CREATE SCHEMA [LifeAsiaObj]
GO
/****** Object:  Schema [MASTERS]    Script Date: 06-12-2023 12:25:45 ******/
CREATE SCHEMA [MASTERS]
GO
/****** Object:  Schema [UsrRoles]    Script Date: 06-12-2023 12:25:45 ******/
CREATE SCHEMA [UsrRoles]
GO
/****** Object:  Table [COMMS].[CommuBody]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [COMMS].[CommuBody](
	[CommID] [bigint] NOT NULL,
	[CommBody] [varchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [COMMS].[CommuConfg]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [COMMS].[CommuConfg](
	[TemplateID] [bigint] NOT NULL,
	[TemplateDesc] [varchar](1000) NOT NULL,
	[CommType] [tinyint] NOT NULL,
	[ReceipientTo] [varchar](500) NULL,
	[ReceipientCC] [varchar](500) NULL,
	[Subject] [varchar](max) NOT NULL,
	[TemplateLocation] [varchar](500) NOT NULL,
	[SenderName] [varchar](50) NULL,
	[SenderEMail] [varchar](50) NULL,
	[ReplyToMailID] [varchar](50) NULL,
	[ReceipientBCC] [varchar](50) NULL,
	[MailContent] [varchar](max) NULL,
	[FalconideTempID] [bigint] NULL,
	[CallType] [int] NULL,
	[SubType] [int] NULL,
	[TAT] [int] NULL,
	[Comment] [varchar](50) NULL,
 CONSTRAINT [PK_TemplateID] PRIMARY KEY CLUSTERED 
(
	[TemplateID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [COMMS].[CommuDtSource]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [COMMS].[CommuDtSource](
	[Template_ID] [bigint] NOT NULL,
	[SP_Name] [varchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [COMMS].[CommuFileConfg]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [COMMS].[CommuFileConfg](
	[TemplateID] [bigint] NOT NULL,
	[ResultFileType] [varchar](20) NOT NULL,
	[ResultFileLoc] [varchar](500) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [COMMS].[CommuHist]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [COMMS].[CommuHist](
	[CommID] [bigint] IDENTITY(1,1) NOT NULL,
	[SrvReqID] [bigint] NOT NULL,
	[TemplateID] [varchar](1000) NOT NULL,
	[CommType] [tinyint] NOT NULL,
	[ReceipientTo] [varchar](500) NULL,
	[ReceipientCC] [varchar](500) NULL,
	[MobileNos] [varchar](500) NULL,
	[ScheduledTime] [datetime] NULL,
	[TriggeredTime] [datetime] NULL,
	[DeliveryDate] [datetime] NULL,
	[DeliveryStatus] [tinyint] NULL,
	[Retries] [smallint] NULL,
	[FailureReason] [varchar](1000) NULL,
	[ApiHeader] [varchar](40) NULL,
	[Tasgs] [varchar](1) NULL,
	[PolicyRef] [int] NULL,
 CONSTRAINT [PK_CommuHist] PRIMARY KEY CLUSTERED 
(
	[CommID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [COMMS].[CommuHistFiles]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [COMMS].[CommuHistFiles](
	[CommID] [bigint] NOT NULL,
	[ResultFileLoc] [varchar](500) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [COMMS].[SP_Param]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [COMMS].[SP_Param](
	[SP_Name] [varchar](50) NOT NULL,
	[Param_Name] [varchar](50) NOT NULL,
	[Param_Index] [tinyint] NULL,
	[Param_DtTyp] [nchar](10) NULL,
	[Param_Direction] [tinyint] NULL,
	[Param_Val_Path] [varchar](50) NOT NULL,
 CONSTRAINT [PK_SP_Param] PRIMARY KEY CLUSTERED 
(
	[SP_Name] ASC,
	[Param_Name] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Core].[PolBankDtls]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Core].[PolBankDtls](
	[PolBankDtlsID] [bigint] IDENTITY(1,1) NOT NULL,
	[LA_PolicyNo] [varchar](15) NOT NULL,
	[LA_CustomerID] [varchar](15) NOT NULL,
	[Bank_Name] [varchar](15) NOT NULL,
	[Bank_IFSC] [varchar](15) NOT NULL,
	[Acc_HldrName] [varchar](100) NOT NULL,
	[Acc_Number] [varchar](100) NOT NULL,
	[Acc_Type] [bigint] NOT NULL,
	[RegistredOn] [datetime] NULL,
	[SrvReqID] [bigint] NULL,
	[Acc_Active] [bit] NULL,
	[CreatedOn] [smalldatetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[ModifiedOn] [smalldatetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
 CONSTRAINT [PK_PolBankDtls] PRIMARY KEY CLUSTERED 
(
	[PolBankDtlsID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Core].[PolBankDtlsHist]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Core].[PolBankDtlsHist](
	[PolBankDtlsHistID] [bigint] IDENTITY(1,1) NOT NULL,
	[LA_PolicyNo] [varchar](15) NOT NULL,
	[LA_CustomerID] [varchar](15) NOT NULL,
	[Bank_Name] [varchar](15) NOT NULL,
	[Bank_IFSC] [varchar](15) NOT NULL,
	[Acc_HldrName] [varchar](100) NOT NULL,
	[Acc_Number] [varchar](100) NOT NULL,
	[Acc_Type] [bigint] NOT NULL,
	[RegistredOn] [datetime] NULL,
	[SrvReqID] [bigint] NULL,
	[Acc_Active] [bit] NULL,
	[CreatedOn] [smalldatetime] NULL,
	[CreatedBy] [varchar](50) NULL,
	[ModifiedOn] [smalldatetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
 CONSTRAINT [PK_PolBankDtlsHist] PRIMARY KEY CLUSTERED 
(
	[PolBankDtlsHistID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [FISS].[DeDup]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[DeDup](
	[LA_PolicyNo] [varchar](15) NULL,
	[SrvReqRefNo] [varchar](50) NULL,
	[DeDupPayload] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [FISS].[OTPService]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[OTPService](
	[OTPServiceId] [bigint] IDENTITY(1,1) NOT NULL,
	[MobileNo] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
	[PolicyNo] [varchar](50) NULL,
	[OTP] [varchar](10) NULL,
	[ValidTill] [datetime] NOT NULL,
	[InvalidAttempts] [tinyint] NULL,
 CONSTRAINT [PK_OTPService] PRIMARY KEY CLUSTERED 
(
	[OTPServiceId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [FISS].[RequestApprovals]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[RequestApprovals](
	[SrvReqID] [bigint] NOT NULL,
	[Band_LLimit] [decimal](18, 2) NOT NULL,
	[Band_ULimit] [decimal](18, 2) NOT NULL,
	[AppAction] [varchar](20) NOT NULL,
	[SrOrder] [tinyint] NULL,
	[ApprovedBy] [varchar](50) NULL,
	[ApprovedOn] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [FISS].[ServCommTemplate]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[ServCommTemplate](
	[CallType] [int] NOT NULL,
	[SubType] [int] NOT NULL,
	[CommType] [int] NOT NULL,
	[TemplateID] [int] NOT NULL,
	[Status] [varchar](10) NULL,
	[TAT] [varchar](50) NULL,
	[Comment] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [FISS].[ServRequest]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[ServRequest](
	[SrvReqID] [bigint] IDENTITY(1,1) NOT NULL,
	[SrvReqRefNo] [varchar](50) NULL,
	[Category] [smallint] NULL,
	[CallType] [int] NULL,
	[SubType] [int] NULL,
	[ReqSource] [int] NULL,
	[ReqMode] [int] NULL,
	[PolicyRef] [int] NULL,
	[CustomerRef] [int] NULL,
	[CustRole] [int] NULL,
	[BranchRef] [int] NULL,
	[CurrentStatus] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedByRef] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
	[ModifiedByRef] [varchar](50) NULL,
	[Source] [varchar](50) NULL,
	[PrtSerReqID] [bigint] NULL,
	[TransactionPayload] [nvarchar](max) NULL,
	[AssignedToRole] [varchar](50) NULL,
	[AssignedToUser] [int] NULL,
	[ReasonForChange] [varchar](50) NULL,
	[RequestDateTime] [datetime] NULL,
	[ReasonDelayed] [varchar](50) NULL,
	[CustSignDateTime] [datetime] NULL,
	[PolicyStatus] [varchar](50) NULL,
	[ProposerName] [varchar](50) NULL,
	[PlanName] [varchar](50) NULL,
	[CommunicationPayload] [nvarchar](max) NULL,
	[DOB] [varchar](50) NULL,
 CONSTRAINT [PK_ServRequest] PRIMARY KEY CLUSTERED 
(
	[SrvReqID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [FISS].[ServRequestDtls]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[ServRequestDtls](
	[ServRequestDtlId] [int] IDENTITY(1,1) NOT NULL,
	[SrvReqID] [bigint] NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[TagName] [varchar](50) NOT NULL,
	[TagValue] [varchar](1000) NULL,
	[ReqDtTm] [timestamp] NOT NULL,
 CONSTRAINT [PK__ServRequ__9FFCEF4647488BA3] PRIMARY KEY CLUSTERED 
(
	[ServRequestDtlId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [FISS].[ServRequestHist]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[ServRequestHist](
	[SrvReqID] [bigint] NOT NULL,
	[Status] [varchar](50) NULL,
	[UsrIdRef] [varchar](50) NULL,
	[ActionDt] [datetime] NULL,
	[UsrRoleRef] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [FISS].[ServRequestReqt]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[ServRequestReqt](
	[SrvReqID] [bigint] NOT NULL,
	[RequirementID] [bigint] NULL,
	[RequirementStatus] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [FISS].[ServRequestTrans]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[ServRequestTrans](
	[TransectionId] [int] IDENTITY(1,1) NOT NULL,
	[SrvReqRefNo] [varchar](50) NOT NULL,
	[Status] [varchar](50) NOT NULL,
	[RequirementList] [varchar](100) NULL,
	[RequirementComments] [varchar](200) NULL,
	[Comments] [varchar](200) NULL,
	[TransactionPayload] [varchar](max) NULL,
 CONSTRAINT [PK_ServRequestTrans] PRIMARY KEY CLUSTERED 
(
	[TransectionId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [FISS].[ServReqWrkFlow]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[ServReqWrkFlow](
	[CallType] [int] NOT NULL,
	[SubType] [int] NOT NULL,
	[CurrentStatus] [int] NOT NULL,
	[RuleText] [varchar](4000) NOT NULL,
	[RuleSeqNo] [smallint] NOT NULL,
	[SuccessResp] [varchar](100) NOT NULL,
	[UpdtStatusTo] [varchar](100) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [FISS].[UserInbox]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [FISS].[UserInbox](
	[SrvReqID] [bigint] NOT NULL,
	[UsrID] [varchar](50) NOT NULL,
	[RoleID] [smallint] NULL,
	[AllocatedOn] [datetime] NULL,
	[ClosedOn] [datetime] NULL,
	[BranchID] [varchar](50) NULL,
	[ReqSignedOn] [timestamp] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [LifeAsiaObj].[LA_Customer]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [LifeAsiaObj].[LA_Customer](
	[CustomerRef] [int] IDENTITY(1,1) NOT NULL,
	[LA_CustomerID] [varchar](15) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [LifeAsiaObj].[LA_Policy]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [LifeAsiaObj].[LA_Policy](
	[PolicyRef] [int] IDENTITY(1,1) NOT NULL,
	[LA_PolicyNo] [varchar](15) NULL,
	[FG_ApplNo] [varchar](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [MASTERS].[AppMasters]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MASTERS].[AppMasters](
	[MstCategory] [varchar](20) NOT NULL,
	[MstID] [bigint] NOT NULL,
	[MstDesc] [varchar](200) NOT NULL,
	[MstParentID] [bigint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [MASTERS].[CtStStrucMst]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MASTERS].[CtStStrucMst](
	[CtStStrucId] [int] IDENTITY(1,1) NOT NULL,
	[CallType] [int] NOT NULL,
	[SubType] [int] NOT NULL,
	[TagName] [varchar](50) NOT NULL,
	[TagDtTyp] [varchar](50) NOT NULL,
	[TagDtFormat] [varchar](50) NULL,
	[JsonPath] [varchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[CtStStrucId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [MASTERS].[RaiseRequirement]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MASTERS].[RaiseRequirement](
	[CallType] [int] NOT NULL,
	[SubType] [int] NOT NULL,
	[RaiseReqId] [int] NOT NULL,
	[Status] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [MASTERS].[RequestAllocMatrix]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [MASTERS].[RequestAllocMatrix](
	[CallType] [int] NOT NULL,
	[SubTType] [int] NOT NULL,
	[Band_LLimit] [decimal](18, 2) NOT NULL,
	[Band_ULimit] [decimal](18, 2) NOT NULL,
	[AppAction] [varchar](20) NOT NULL,
	[AllocateUsrID] [varchar](50) NOT NULL,
	[SrOrder] [tinyint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [UsrRoles].[AppUsr]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [UsrRoles].[AppUsr](
	[UsrID] [varchar](50) NOT NULL,
	[RoleID] [varchar](50) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
	[UsrStatus] [tinyint] NOT NULL,
	[LastLoggedIn] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [UsrRoles].[UsrRoleMapp]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [UsrRoles].[UsrRoleMapp](
	[UsrID] [varchar](50) NOT NULL,
	[RoleID] [varchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [UsrRoles].[UsrRoles]    Script Date: 06-12-2023 12:25:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [UsrRoles].[UsrRoles](
	[RoleID] [varchar](50) NOT NULL,
	[RoleName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_UsrRoles] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AppMasters]    Script Date: 06-12-2023 12:25:45 ******/
CREATE NONCLUSTERED INDEX [IX_AppMasters] ON [MASTERS].[AppMasters]
(
	[MstCategory] ASC,
	[MstID] ASC,
	[MstParentID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [UsrRoles].[AppUsr] ADD  DEFAULT ((1)) FOR [UsrStatus]
GO
ALTER TABLE [COMMS].[CommuBody]  WITH CHECK ADD  CONSTRAINT [FK_CommuBody_CommID] FOREIGN KEY([CommID])
REFERENCES [COMMS].[CommuHist] ([CommID])
GO
ALTER TABLE [COMMS].[CommuBody] CHECK CONSTRAINT [FK_CommuBody_CommID]
GO
ALTER TABLE [COMMS].[CommuDtSource]  WITH CHECK ADD  CONSTRAINT [FK_CommuDtSource_CommuConfg] FOREIGN KEY([Template_ID])
REFERENCES [COMMS].[CommuConfg] ([TemplateID])
GO
ALTER TABLE [COMMS].[CommuDtSource] CHECK CONSTRAINT [FK_CommuDtSource_CommuConfg]
GO
ALTER TABLE [COMMS].[CommuFileConfg]  WITH CHECK ADD  CONSTRAINT [FK_TemplateID_TemplateID] FOREIGN KEY([TemplateID])
REFERENCES [COMMS].[CommuConfg] ([TemplateID])
GO
ALTER TABLE [COMMS].[CommuFileConfg] CHECK CONSTRAINT [FK_TemplateID_TemplateID]
GO
ALTER TABLE [COMMS].[CommuHist]  WITH CHECK ADD  CONSTRAINT [FK_CommuHist_ServRequest] FOREIGN KEY([SrvReqID])
REFERENCES [FISS].[ServRequest] ([SrvReqID])
GO
ALTER TABLE [COMMS].[CommuHist] CHECK CONSTRAINT [FK_CommuHist_ServRequest]
GO
ALTER TABLE [COMMS].[CommuHistFiles]  WITH CHECK ADD  CONSTRAINT [FK_CommuHistFiles_CommuHist] FOREIGN KEY([CommID])
REFERENCES [COMMS].[CommuHist] ([CommID])
GO
ALTER TABLE [COMMS].[CommuHistFiles] CHECK CONSTRAINT [FK_CommuHistFiles_CommuHist]
GO
ALTER TABLE [FISS].[RequestApprovals]  WITH CHECK ADD  CONSTRAINT [FK_RequestApprovals_ServRequest] FOREIGN KEY([SrvReqID])
REFERENCES [FISS].[ServRequest] ([SrvReqID])
GO
ALTER TABLE [FISS].[RequestApprovals] CHECK CONSTRAINT [FK_RequestApprovals_ServRequest]
GO
ALTER TABLE [FISS].[ServRequestDtls]  WITH CHECK ADD  CONSTRAINT [FK_ServRequestDtls_ServRequest] FOREIGN KEY([SrvReqID])
REFERENCES [FISS].[ServRequest] ([SrvReqID])
GO
ALTER TABLE [FISS].[ServRequestDtls] CHECK CONSTRAINT [FK_ServRequestDtls_ServRequest]
GO
ALTER TABLE [FISS].[ServRequestHist]  WITH CHECK ADD  CONSTRAINT [FK_ServRequestHist_ServRequest] FOREIGN KEY([SrvReqID])
REFERENCES [FISS].[ServRequest] ([SrvReqID])
GO
ALTER TABLE [FISS].[ServRequestHist] CHECK CONSTRAINT [FK_ServRequestHist_ServRequest]
GO
ALTER TABLE [FISS].[ServRequestReqt]  WITH CHECK ADD  CONSTRAINT [FK_ServRequestReqt_ServRequest] FOREIGN KEY([SrvReqID])
REFERENCES [FISS].[ServRequest] ([SrvReqID])
GO
ALTER TABLE [FISS].[ServRequestReqt] CHECK CONSTRAINT [FK_ServRequestReqt_ServRequest]
GO
ALTER TABLE [FISS].[UserInbox]  WITH CHECK ADD  CONSTRAINT [FK_UserInbox_ServRequest] FOREIGN KEY([SrvReqID])
REFERENCES [FISS].[ServRequest] ([SrvReqID])
GO
ALTER TABLE [FISS].[UserInbox] CHECK CONSTRAINT [FK_UserInbox_ServRequest]
GO
ALTER TABLE [UsrRoles].[AppUsr]  WITH CHECK ADD  CONSTRAINT [FK_AppUsr_UsrRoles] FOREIGN KEY([RoleID])
REFERENCES [UsrRoles].[UsrRoles] ([RoleID])
GO
ALTER TABLE [UsrRoles].[AppUsr] CHECK CONSTRAINT [FK_AppUsr_UsrRoles]
GO
ALTER TABLE [UsrRoles].[UsrRoleMapp]  WITH CHECK ADD  CONSTRAINT [FK_UsrRoleMapp_UsrRoles] FOREIGN KEY([RoleID])
REFERENCES [UsrRoles].[UsrRoles] ([RoleID])
GO
ALTER TABLE [UsrRoles].[UsrRoleMapp] CHECK CONSTRAINT [FK_UsrRoleMapp_UsrRoles]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Unique identifier for template' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuConfg', @level2type=N'COLUMN',@level2name=N'TemplateID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Short Description of the template' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuConfg', @level2type=N'COLUMN',@level2name=N'TemplateDesc'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SELECT *  FROM [MASTERS].[AppMasters] AppMst WHERE AppMst.MstCategory = ''COMM_TYP'' ORDER BY MstDesc' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuConfg', @level2type=N'COLUMN',@level2name=N'CommType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Comma seperated values for email id and mobile nos' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuConfg', @level2type=N'COLUMN',@level2name=N'ReceipientTo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Comma seperated values for email id and mobile nos' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuConfg', @level2type=N'COLUMN',@level2name=N'ReceipientCC'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Applicable for EMails' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuConfg', @level2type=N'COLUMN',@level2name=N'Subject'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Location of JSON (SMS) and HTML (EMail Body)' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuConfg', @level2type=N'COLUMN',@level2name=N'TemplateLocation'
GO
EXEC sys.sp_addextendedproperty @name=N'Description', @value=N'Main table that configures the communication ' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuConfg'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Unique identifier for every communication' , @level0type=N'SCHEMA',@level0name=N'COMMS', @level1type=N'TABLE',@level1name=N'CommuHist', @level2type=N'COLUMN',@level2name=N'ApiHeader'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Life Asia Policy No' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtls', @level2type=N'COLUMN',@level2name=N'LA_PolicyNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Life Asia Client ID' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtls', @level2type=N'COLUMN',@level2name=N'LA_CustomerID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Account Holder Name' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtls', @level2type=N'COLUMN',@level2name=N'Acc_HldrName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Bank Account Number' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtls', @level2type=N'COLUMN',@level2name=N'Acc_Number'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'select *  from [MASTERS].[AppMasters] where MstCategory = ''BNKACCTYP''' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtls', @level2type=N'COLUMN',@level2name=N'Acc_Type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Last time the Account was verified' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtls', @level2type=N'COLUMN',@level2name=N'RegistredOn'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Refers FISS.ServRequest.ServReqID' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtls', @level2type=N'COLUMN',@level2name=N'SrvReqID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Life Asia Policy No' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtlsHist', @level2type=N'COLUMN',@level2name=N'LA_PolicyNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Life Asia Client ID' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtlsHist', @level2type=N'COLUMN',@level2name=N'LA_CustomerID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Account Holder Name' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtlsHist', @level2type=N'COLUMN',@level2name=N'Acc_HldrName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Bank Account Number' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtlsHist', @level2type=N'COLUMN',@level2name=N'Acc_Number'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'select *  from [MASTERS].[AppMasters] where MstCategory = ''BNKACCTYP''' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtlsHist', @level2type=N'COLUMN',@level2name=N'Acc_Type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Last time the Account was verified' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtlsHist', @level2type=N'COLUMN',@level2name=N'RegistredOn'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Refers FISS.ServRequest.ServReqID' , @level0type=N'SCHEMA',@level0name=N'Core', @level1type=N'TABLE',@level1name=N'PolBankDtlsHist', @level2type=N'COLUMN',@level2name=N'SrvReqID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'[FISS].[ServRequest].[Source]' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServCommTemplate', @level2type=N'COLUMN',@level2name=N'Status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Refer to ServRequest.SrvReqID used for parent child relationship' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'SrvReqID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Reference Number used for communication with Customer' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'SrvReqRefNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Query/Request/Complaint' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'Category'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'select * from [MASTERS].[AppMasters] where [MstCategory] = ''REQST_SOURCE''' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'ReqSource'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'select * from [MASTERS].[AppMasters] where [MstCategory] = ''REQST_MODE''' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'ReqMode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Reference to PolicyMaster' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'PolicyRef'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Reference to Customer Master' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'CustomerRef'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Role of Customer, Owner/Insured/Payor/Assignee' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'CustRole'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Reference to Branch Master.ID' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'BranchRef'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Current Status of Request' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'CurrentStatus'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'User role from login screen, Will need to consider it once AD integration is done.' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest', @level2type=N'COLUMN',@level2name=N'Source'
GO
EXEC sys.sp_addextendedproperty @name=N'Description', @value=N'main table to capture service requests' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequest'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'eg: Raised/Update/Closed' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequestHist', @level2type=N'COLUMN',@level2name=N'Status'
GO
EXEC sys.sp_addextendedproperty @name=N'Description', @value=N'Previous changes to the service requesty status and user involved.' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequestHist'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'For POS or any other level actions on Service Request for tracking Service' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'ServRequestTrans'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Refers [FISS].[ServRequest].[SrvReqID]' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'UserInbox', @level2type=N'COLUMN',@level2name=N'SrvReqID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'User ID the task will be allocated to.' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'UserInbox', @level2type=N'COLUMN',@level2name=N'UsrID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Role the tasks will be allocated to' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'UserInbox', @level2type=N'COLUMN',@level2name=N'RoleID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Date when the ServReq was allocated, used to measure TAT/Aging' , @level0type=N'SCHEMA',@level0name=N'FISS', @level1type=N'TABLE',@level1name=N'UserInbox', @level2type=N'COLUMN',@level2name=N'AllocatedOn'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SELECT * FROM [MASTERS].[AppMasters] WHERE MstCategory=  ''CALL_TYP''' , @level0type=N'SCHEMA',@level0name=N'MASTERS', @level1type=N'TABLE',@level1name=N'RequestAllocMatrix', @level2type=N'COLUMN',@level2name=N'CallType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'SELECT * FROM [MASTERS].[AppMasters] WHERE MstCategory=  ''SUB_TYP'' ' , @level0type=N'SCHEMA',@level0name=N'MASTERS', @level1type=N'TABLE',@level1name=N'RequestAllocMatrix', @level2type=N'COLUMN',@level2name=N'SubTType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Band Upper Limit' , @level0type=N'SCHEMA',@level0name=N'MASTERS', @level1type=N'TABLE',@level1name=N'RequestAllocMatrix', @level2type=N'COLUMN',@level2name=N'Band_LLimit'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Band Lower Limit' , @level0type=N'SCHEMA',@level0name=N'MASTERS', @level1type=N'TABLE',@level1name=N'RequestAllocMatrix', @level2type=N'COLUMN',@level2name=N'Band_ULimit'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Verify Which field SA/ Surrender value' , @level0type=N'SCHEMA',@level0name=N'MASTERS', @level1type=N'TABLE',@level1name=N'RequestAllocMatrix', @level2type=N'COLUMN',@level2name=N'AppAction'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Allocate to User(s), can be ; seperated user IDs' , @level0type=N'SCHEMA',@level0name=N'MASTERS', @level1type=N'TABLE',@level1name=N'RequestAllocMatrix', @level2type=N'COLUMN',@level2name=N'AllocateUsrID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Allocate to User(s) upon approval, can be ; seperated user IDs' , @level0type=N'SCHEMA',@level0name=N'MASTERS', @level1type=N'TABLE',@level1name=N'RequestAllocMatrix', @level2type=N'COLUMN',@level2name=N'SrOrder'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'User ID available in AD' , @level0type=N'SCHEMA',@level0name=N'UsrRoles', @level1type=N'TABLE',@level1name=N'AppUsr', @level2type=N'COLUMN',@level2name=N'UsrID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Links to UsrRoles.RoleID' , @level0type=N'SCHEMA',@level0name=N'UsrRoles', @level1type=N'TABLE',@level1name=N'AppUsr', @level2type=N'COLUMN',@level2name=N'RoleID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Used to Display user name on screen. Eventually it will be made available in FD AD.' , @level0type=N'SCHEMA',@level0name=N'UsrRoles', @level1type=N'TABLE',@level1name=N'AppUsr', @level2type=N'COLUMN',@level2name=N'UserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ACTIVE/INACTIVE will be used if LoginID is outside AD, will need to provision for password field in this scenario' , @level0type=N'SCHEMA',@level0name=N'UsrRoles', @level1type=N'TABLE',@level1name=N'AppUsr', @level2type=N'COLUMN',@level2name=N'UsrStatus'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'datetime when the user last logged in' , @level0type=N'SCHEMA',@level0name=N'UsrRoles', @level1type=N'TABLE',@level1name=N'AppUsr', @level2type=N'COLUMN',@level2name=N'LastLoggedIn'
GO
EXEC sys.sp_addextendedproperty @name=N'Description', @value=N'Application User List' , @level0type=N'SCHEMA',@level0name=N'UsrRoles', @level1type=N'TABLE',@level1name=N'AppUsr'
GO


[Core].[DND_LIST]
[Core].[DND_LIST_HIST]
------------------Deployed to uat 19-01------------------
alter table [FISS].[EmailClassCTST] alter column [DecisionBy] [varchar](50) NULL
go
ALTER TABLE [FISS].[EmailClassCTST] ADD [SrvReqRefNo] varchar(50)
go1
ALTER TABLE [FISS].[EmailClassCTST]  DROP CONSTRAINT [FK_EmailClassCTST_ServRequest]
GO
update [FISS].[EmailClassify] set IsSenderBlckLst =0 where IsSenderBlckLst is null
go
alter table [FISS].[EmailClassify] add IsSenderBlckLst bit default 0
go
insert into [MASTERS].[PolClntAttr] (PolClntAttrID,Area,TagName,TagDtTyp,TagDtFormat,JsonPath)
values(6,'CLIENT','CKYC','System.String',null,null)
go
alter table [Core].[PolBankDtls] alter column Bank_Name varchar(100)
go
alter table [Core].[PolBankDtlsHist] alter column Bank_Name varchar(100)
go
update [FISS].[EmailClassify] set source  =-1000 where source is null
ALTER TABLE [FISS].[EmailClassify] ADD  CONSTRAINT [DF_EmailResponse_source]  DEFAULT ((0)) FOR [source]
go
alter table [FISS].[EmailClassify] alter column source int;
go

---20 Feb 2024
CREATE UNIQUE NONCLUSTERED INDEX [IX_TAT_INFO] ON [MASTERS].[TAT_INFO]
(
	[CallType] ASC, [SubType] ASC, [CATEGORY] ASC
)
GO

UPDATE [MASTERS].[TAT_INFO] SET CATEGORY ='CTST'
GO

ALTER TABLE [MASTERS].[TAT_INFO] ADD CATEGORY VARCHAR(30)
GO