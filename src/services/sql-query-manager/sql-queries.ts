
import { BTN_SQL_QUERIES_MAP_DEF } from 'src/models/constants';
import { BUTTON_SUB_BUTTON_LABEL, RECORDING_SUB_BUTTON_LABEL, SYSTEM_SUB_BUTTON_LABEL, USER_SUB_BUTTON_LABEL } from '../../models/button-data';

export const BTN_SQL_QUERIES_MAP: BTN_SQL_QUERIES_MAP_DEF[]  = [
    {
        type: SYSTEM_SUB_BUTTON_LABEL.ENTERPISE_INFO,
        sqlStr: "select d.name as EnterpriseName, d.domainName as EnterpriseDomainName, c.name as InstanceName, c.domainName as InstanceDomainName, a.id as ZoneId, a.certificateAuthorityIP, a.softwareVersion, a.name, b.replicationEnabled, b.replicationRole from Zone a, InterzoneCommConfigZone b, Instance c, Enterprise d where d.id=c.parentEnterpriseId and c.id=a.parentInstanceId and b.id=a.interzoneCommConfigZoneId",
        header: ['Enterprise Name', 'Enterprise Domain Name', 'Instance Name', 'Instance Domain Name', 'ZoneId', 'certificateAuthorityIP', 'SoftwareVersion', 'name', 'replicationEnabled', 'replicationRole']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.ZONE_INFO,
        sqlStr: "select a.parentZoneId as ZoneCluster, a.vIPAddress, c.iPAddress,c.hostName,c.macAddress,d.haRole,d.haState from ServerCluster a, ServerClusterDeviceServerServersMap b, Device c, DeviceServer d where a.id=b.serverClusterId and b.serversId=c.deviceServerId and c.deviceServerId=d.id",
        header: ['Zone Cluster', 'VIP Address', 'IP Address', 'Host Name', 'Mac Address', 'HA Role', 'HA State']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.CCM_INFO,
        sqlStr: "select a.hostname, a.macAddress, a.iPAddress,a.parentZoneId, b.serverPersonality,b.haRole,b.haState,c.listenAddress from Device a, DeviceServer b, ComponentAppServer c where a.deviceTypeId=5 and a.deviceServerId = b.id and b.componentAppServerId=c.id order by a.parentZoneId,a.iPAddress",
        header: ['Host Name', 'MAC Address', 'IP Address', 'Parent Zone ID', 'Server Personality', 'HA Role', 'HA State', 'Listen Addres']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.MEDIA_MGR_INFO,
        sqlStr: "select a.hostname, a.macAddress, a.iPAddress,a.parentZoneId,b.serverPersonality, d.requestOperationalState from Device a, DeviceServer b, ComponentMediaServer d where a.deviceTypeId=5 and a.deviceServerId = b.id and b.componentMediaServerId=d.id",
        header: ['Host Name', 'MAC Address', 'IP Address', 'Parent Zone ID', 'Server Personality', 'Request Operational State']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.MEDIA_GWY_INFO,
        sqlStr: "select a.name, a.macAddress, a.iPAddress,a.parentZoneId from Device a where a.deviceTypeId=2",
        header: ["MG Name", "MAC Address", "IP Address", "Parent Zone ID"]
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.DEVICE_ZONE_INFO,
        sqlStr: "select a.macAddress, a.IPAddress, d.loginName, a.parentZoneId as 'DeployZone', b.backupZoneId as 'BcpZone',b.preference as 'BcpPref',c.zoneId as 'CurrentZone' from Device a, CDIBCPPreference b, LogonSession c, User d where a.id=b.parentDeviceId and a.id=c.deviceId and c.userId=d.id order by a.parentZoneId, a.macAddress,b.backupZoneId,b.preference",
        header: ['MAC Address', 'IP Address', 'Login Name', 'Deploy Zone', 'Bcp Zone', 'Bcp Pref', 'Current Zone']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.IQMAX_TURRET_INVENTORY,
        sqlStr: "select a.id, a.macAddress, a.iPAddress, a.model, a.inventoryInfo, a.inventoryRegistrationTime, b.userId, b.loginName from Device a left join (select d.deviceId, d.userId, e.loginName from LogonSession d, User e where d.userId=e.id) b on a.id=b.deviceId where a.model='IQMAX' and a.inventoryInfo like '%.0 hwpart%'",
        header: ['Device ID', 'MAC Address', 'IP Address', 'Model', 'Inventory Info', 'inventory Registration Time', 'User ID', 'Login Name']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.TURRET_INFO,
        sqlStr: "select a.id as UserId, a.userCDIId as UserCDIId, a.loginName as LoginName, b.id as DeviceId, b.macAddress as MacAddress, b.IPAddress as IP_Address from User a, Device b, LogonSession c where a.id=c.userId and b.id=c.deviceId",
        header: ['User Id', 'UserCDI Id', 'Login Name', 'Device Id', 'Mac Address', 'IP Address']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.JOB_DETAILS_INFO,
        sqlStr: "select distinct left(description, 22) as 'Description', left(startTime,10) as 'Date/Hour', zoneId, count(startTime) as 'Count' from Job group by left(description, 22),left(startTime,10),zoneId",
        header: ['Description', 'Date/Hour', 'ZoneID', 'StartTimeCount']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.CDI_COUNTS,
        sqlStr: "select(select concat('All: ',count(*)) from Device a, DeviceTurret b where a.deviceTypeId=3 and a.deviceTurretId=b.id and b.turretSoftwareLicense ='MAX') as 'IQ/Max',(select concat('All: ',count(*)) from Device a, DeviceTurret b where a.deviceTypeId=3 and a.deviceTurretId=b.id and b.turretSoftwareLicense ='Mini4') as 'Mini4',(select concat('All: ',count(*)) from Device a, DeviceTurret b where a.deviceTypeId=3 and a.deviceTurretId=b.id and (b.turretSoftwareLicense ='Edge' or b.turretSoftwareLicense ='Basic')) as 'Edge',(select concat('All: ',count(*)) from Device a, DeviceMercury b where a.deviceTypeId=7 and a.deviceMercuryId=b.id and b.turretSoftwareLicense ='Mercury') as 'IQ/Max Touch',(select concat('All: ',count(*)) from Device a, DevicePulse b where a.deviceTypeId=6 and a.devicePulseId=b.id and b.turretSoftwareLicense ='Pulse') as 'PulseDevice',(select concat('All: ',count(*)) from Device a where a.deviceTypeId=4) as 'UDA' union select (select concat('Actv: ',count(*)) from Device a, DeviceTurret b, LogonSession c where a.deviceTypeId=3 and a.deviceTurretId=b.id and a.id=c.deviceId and b.turretSoftwareLicense ='MAX' and c.sessionType='cdi') as 'IQ/Max',(select concat('Actv: ',count(*)) from Device a, DeviceTurret b, LogonSession c where a.deviceTypeId=3 and a.deviceTurretId=b.id and a.id=c.deviceId and b.turretSoftwareLicense ='Mini4' and c.sessionType='cdi') as 'Mini4',(select concat('Actv: ',count(*)) from Device a, DeviceTurret b, LogonSession c where a.deviceTypeId=3 and a.deviceTurretId=b.id and a.id=c.deviceId and (b.turretSoftwareLicense ='Edge' or b.turretSoftwareLicense ='Basic') and c.sessionType='cdi') as 'Edge',(select concat('Actv: ',count(*)) from Device a, DeviceMercury b, LogonSession c where a.deviceTypeId=7 and a.deviceMercuryId=b.id and a.id=c.deviceId and b.turretSoftwareLicense ='Mercury' and c.sessionType='cdi') as 'IQ/Max Touch',(select concat('Actv: ',count(*)) from Device a, DevicePulse b, LogonSession c where a.deviceTypeId=6 and a.devicePulseId=b.id and a.id=c.deviceId and b.turretSoftwareLicense ='Pulse' and c.sessionType='cdi') as 'PulseDevice',(select concat('Actv: ',count(*)) from Device a, LogonSession c where a.deviceTypeId=4 and a.id=c.deviceId and c.sessionType='cdi') as 'UDA' union select (select concat('LgOn: ',count(*)) from Device a, DeviceTurret b, LogonSession c where a.deviceTypeId=3 and a.deviceTurretId=b.id and a.id=c.deviceId and b.turretSoftwareLicense ='MAX' and c.sessionType='cdiuser') as 'IQ/Max',(select concat('LgOn: ',count(*)) from Device a, DeviceTurret b, LogonSession c where a.deviceTypeId=3 and a.deviceTurretId=b.id and a.id=c.deviceId and b.turretSoftwareLicense ='Mini4' and c.sessionType='cdiuser') as 'Mini4',(select concat('LgOn: ',count(*)) from Device a, DeviceTurret b, LogonSession c where a.deviceTypeId=3 and a.deviceTurretId=b.id and a.id=c.deviceId and (b.turretSoftwareLicense ='Edge' or b.turretSoftwareLicense ='Basic') and c.sessionType='cdiuser') as 'Edge',(select concat('LgOn: ',count(*)) from Device a, DeviceMercury b, LogonSession c where a.deviceTypeId=7 and a.deviceMercuryId=b.id and a.id=c.deviceId and b.turretSoftwareLicense ='Mercury' and c.sessionType='cdiuser') as 'IQ/Max Touch',(select concat('LgOn: ',count(*)) from Device a, DevicePulse b, LogonSession c where a.deviceTypeId=6 and a.devicePulseId=b.id and a.id=c.deviceId and b.turretSoftwareLicense ='Pulse' and c.sessionType='cdiuser') as 'PulseDevice',(select concat('LgOn: ',count(*)) from Device a, LogonSession c where a.deviceTypeId=4 and a.id=c.deviceId and c.sessionType='cdiuser') as 'UDA'",
        header: ['Iqmax', 'Mini4', 'Edge', 'Touch', 'PulseDevice', 'UDA']
    },
    {
        type : SYSTEM_SUB_BUTTON_LABEL.LICENSE_INFO,
        sqlStr: "select lfeat.id as 'FeatId', lfeat.name, lcdfeat.hardLimit, lcdfeat.softLimit, userLic.userLicFeatCnt, devLic.devLicFeatCnt from LicensedFeature lcdfeat, LicensableFeature lfeat left join (select licensableFeatureId, count(licensableFeatureId) as 'userLicFeatCnt' from LicensedFeatureAssignedUser group by licensableFeatureId) as userLic on lfeat.id = userLic.licensableFeatureId left join (select licensableFeatureId, count(licensableFeatureId) as 'devLicFeatCnt' from LicensedFeatureAssignedDevice group by licensableFeatureId) as devLic on lfeat.id = devLic.licensableFeatureId where lcdfeat.licensableFeatureId=lfeat.id order by lfeat.id",
        header: ['FeatId', 'Name', 'Hard Limit', 'Soft Limit', 'User License Feat Count', 'Dev License Feat Count']
    },
    {
        type : USER_SUB_BUTTON_LABEL.USER_INFO,
        sqlStr: "select a.id as userid, a.userCDIId as usercdiid, a.loginName as loginname, d.id as deviceid, d.macAddress as macaddress, d.IPAddress as ip_address from User a left join (select c.userId, b.id, b.macAddress, b.IPAddress from Device b, LogonSession c where b.id=c.deviceId)d on a.id=d.userId order by a.loginName",
        header: ['User ID', 'User CDI ID', 'Login Name', 'Device ID', 'MAC Address', 'IP Address']
    },
    {
        type : USER_SUB_BUTTON_LABEL.COMMUNICATION_HISTORY,
        sqlStr: "select distinct userId, deviceIdId, left(startTime,10) as 'Date', count(startTime) as 'Count' from CommunicationHistory where callType='record' group by left(startTime,10),userId",
        header: ['User ID', 'Device ID', 'Date', 'Count']
    },
    {
        type : USER_SUB_BUTTON_LABEL.JOB_EXECUTION_EVENT,
        sqlStr: "select distinct left(description, 22) as 'Description', left(startTime,13) as 'Date/Hour', count(startTime) as 'Count' from JobExecutionEvent group by left(description, 22),left(startTime,13)",
        header: ['Description', 'Date/Hour', 'Count']
    },
    {
        type : USER_SUB_BUTTON_LABEL.JOB_SUMMARY,
        sqlStr: "select distinct left(description, 22) as 'Description', left(startTime,10) as 'Date/Hour', zoneId, count(startTime) as 'Count' from Job group by left(description, 22),left(startTime,10),zoneId",
        header: ['Description',	'Date/Hour', 'Zone ID',	'Count']
    },
    {
        type : USER_SUB_BUTTON_LABEL.PERSONAL_EXTENSION,
        sqlStr: "select a.id as UserId, a.userCDIId as UserCDIId, a.loginName as LoginName, d.id as DeviceId, d.macAddress as MacAddress, d.IPAddress as 'IP Address', d.id as resAorId, e.resourceAOR as PersExt from ResourceAOR e, UserCDI f, User a left join(select c.userId, b.id, b.macAddress, b.IPAddress from Device b, LogonSession c where b.id = c.deviceId)d on a.id = d.userId where e.id = f.personalExtensionId and a.userCDIId = f.id",
        header: ['User ID', 'UserCDI ID', 'Login Name', 'Device ID', 'MAC Address', 'IP Address', 'Personal Ext']
    },
    {
        type : USER_SUB_BUTTON_LABEL.PERSONALDIRNAMES_INFO,
        sqlStr: "select a.loginName, c.id,c.firstName, c.lastName from User a, UserCDI b, PersonalContact c where c.parentPersonalDirectoryId=b.personalDirectoryId and a.userCDIId=b.id",
        header: ['loginName', 'ID', 'FirstName', 'LastName']
    },
    {
        type : USER_SUB_BUTTON_LABEL.USERCDIWITHNOUSERID_INFO,
        sqlStr: "select * from(select a.id as 'UserCDI id', a.intercomExtension, a.personalExtensionId, b.id as 'User id' from UserCDI a left join (select id, userCDIId from User) b on a.id = b.userCDIId)c where c.`User id` is null",
        header: ['UserCDI', 'Id', 'Intercom Extension', 'Personal ExtensionId', 'User Id']
    },
    {
        type : USER_SUB_BUTTON_LABEL.CALLS_PER_DAY,
        sqlStr: "select distinct left(a.startTime,10) as 'Date', c.parentZoneId as 'Zone', count(a.startTime) as 'Count' from CommunicationHistory a, User b, Device c where a.userId=b.id and a.deviceIdId=c.id and (a.eventType='Initiated' or a.eventType='Received') group by left(a.startTime,10),c.parentZoneId;",
        header: ['Date', 'Zone', 'Count']
    },
    {
        type : USER_SUB_BUTTON_LABEL.CALLS_PER_DAY_PER_USER,
        sqlStr: "select distinct a.userId, b.loginName, a.deviceIdId, c.parentZoneId as 'Zone', left(a.startTime,10) as 'Date', count(a.startTime) as 'Count' from CommunicationHistory a, User b, Device c where a.userId=b.id and a.deviceIdId=c.id and (a.eventType='Initiated' or a.eventType='Received') group by left(a.startTime,10),a.userId;",
        header: ['User ID', 'Login Name', 'Device ID', 'Zone', 'Date', 'Count']
    },
    {
        type : RECORDING_SUB_BUTTON_LABEL.RECORDING_MIX,
        sqlStr: "select a.id as UserId, a.loginName, b.recordMixProfileId, c.recordMixId, d.uiName as Mix from User a, UserTurret b, RecordMixProfileOrder c, RecordMix d where a.userTurretId=b.id and b.recordMixProfileId=c.parentRecordMixProfileId and c.recordMixId=d.id order by a.id, b.recordMixProfileId, c.recordMixId",
        header: ['User ID',	'Login Name',	'RecordMix ProfileId',	'RecordMix ID',	'Mix']
    },
    {
        type : RECORDING_SUB_BUTTON_LABEL.RECORDING_MIX_WITH_MASK,
        sqlStr: "(select a.id as UserId, a.loginName, b.recordMixProfileId, c.recordMixId,c.sequence, d.uiName as Mix, conv(d.receiveSource,10,2) as receiveSource, conv(d.transmitSource,10,2) as transmitSource from User a, UserTurret b, RecordMixProfileOrder c, RecordMix d where a.userTurretId=b.id and b.recordMixProfileId=c.parentRecordMixProfileId and c.recordMixId=d.id order by a.loginName,b.recordMixProfileId, c.sequence) union (select a.id as UserId, a.loginName, b.recordMixProfileId, c.recordMixId,c.sequence, d.uiName as Mix, conv(d.receiveSource,10,2) as receiveSource, conv(d.transmitSource,10,2) as transmitSource from User a, UserMercury b, RecordMixProfileOrder c, RecordMix d where a.userMercuryId=b.id and b.recordMixProfileId=c.parentRecordMixProfileId and c.recordMixId=d.id order by a.loginName,b.recordMixProfileId, c.sequence) union (select a.id as UserId, a.loginName, b.recordMixProfileId, c.recordMixId,c.sequence, d.uiName as Mix, conv(d.receiveSource,10,2) as receiveSource, conv(d.transmitSource,10,2) as transmitSource from User a, UserPulse b, RecordMixProfileOrder c, RecordMix d where a.userPulseId=b.id and b.recordMixProfileId=c.parentRecordMixProfileId and c.recordMixId=d.id order by a.loginName,b.recordMixProfileId, c.sequence) union (select a.id as UserId, a.loginName, b.recordMixProfileId, c.recordMixId,c.sequence, d.uiName as Mix, conv(d.receiveSource,10,2) as receiveSource, conv(d.transmitSource,10,2) as transmitSource from User a, UserUDA b, RecordMixProfileOrder c, RecordMix d where a.userUDAId=b.id and b.recordMixProfileId=c.parentRecordMixProfileId and c.recordMixId=d.id order by a.loginName,b.recordMixProfileId, c.sequence);",
        header: ['User ID', 'Login Name', 'RecordMix ProfileId', 'RecordMix ID', 'Sequence', 'Mix', 'Receive Source', 'Transmit Source']
    },
    {
        type : RECORDING_SUB_BUTTON_LABEL.RECORDING_MIX_LOGONSESSION,
        sqlStr: "select a.id as UserId, f.deviceId, a.loginName, b.recordMixProfileId, c.sequence, c.recordMixId, d.uiName as Mix, conv(d.receiveSource,10,2) as receiveSource , conv(d.transmitSource,10,2) as transmitSource from User a left join(select deviceId, userId from LogonSession)f on a.id=f.userId, UserTurret b, RecordMixProfileOrder c, RecordMix d where a.userTurretId=b.id and b.recordMixProfileId=c.parentRecordMixProfileId and c.recordMixId=d.id order by a.id, b.recordMixProfileId, c.sequence",
        header: ['User ID', 'Device ID', 'Login Name', 'RecordMix ProfileId', 'Sequence', 'RecordMix ID', 'Mix', 'Receive Source', 'Transmit Source']
    },
    {
        type : BUTTON_SUB_BUTTON_LABEL.BUTTON_RESOURCE_APPEARANCE,
        sqlStr: "select a.id as userId, a.loginName, b.buttonNumber, b.buttonLabel, c.resourceAORId, c.appearance, d.resourceAOR, e.name as location, f.zoneId as Zone from User a, Button b, ButtonResourceAppearance c, ResourceAOR d, DunkinLocation e, LogonSession f where a.userCDIId=b.parentUserCDIId and b.id=c.parentButtonId and c.resourceAORId=d.id and a.homeLocationId=e.id and a.id=f.userId",
        header: ['User ID', 'Login Name', 'Button Number', 'Button Label', 'Resource AOR Id', 'Appearance', 'Resource AOR', 'Location', 'Zone ID']
    },
    {
        type : BUTTON_SUB_BUTTON_LABEL.BUTTON_INFO,
        sqlStr: "select a.id,a.loginName,b.buttonNumber,b.incomingActionRings,c.resourceAORId,c.appearance,c.id,f.resourceAOR,d.deviceId,e.macAddress FROM User a,Button b,ButtonResourceAppearance c,LogonSession d,Device e,ResourceAOR f WHERE a.userCDIId = b.parentUserCDIId AND b.id = c.parentButtonId AND a.id = d.userId AND d.deviceId = e.id and c.resourceAORId = f.id",
        header: ['User ID', 'Login Name', 'Button Number', 'Incoming Action Rings', 'Resource AOR Id', 'Appearance', 'Button Resource Appearance ID', 'Resource AOR', 'Device ID', 'MAC Address']
    },
    {
        type : BUTTON_SUB_BUTTON_LABEL.ARD_BUTTON_INFO,
        sqlStr: "select a.loginName,b.buttonLabel,b.buttonNumber,b.autoSignal,d.signaling FROM User a,Button b,ButtonResourceAppearance c,ResourceAOR d WHERE a.userCDIId = b.parentUserCDIId AND b.id = c.parentButtonId and c.resourceAORId = d.id and d.signaling=false and b.autoSignal=true",
        header: ['Login Name', 'Button Label', 'Button Number', 'Auto Signal', 'Signaling']
    },
    {
        type : BUTTON_SUB_BUTTON_LABEL.FIND_NON600BUTTONSUSERS_INFO,
        sqlStr: "select distinct c.loginName, c.id as userId, c.userCDIId, b.totalCount as NumOfBtns from User c, Button a inner join (select buttonNumber, parentUserCDIId, count(*) totalCount from Button group by Button.parentUserCDIId having count(*) >=2) b on b.buttonNumber = a.buttonNumber and b.parentUserCDIId = a.parentUserCDIId where c.userCDIId=a.parentUserCDIId and b.totalCount<>600",
        header: ['Login Name', 'User ID', 'UserCDI', 'ID', 'No. of Buttons']
    },
    {
        type : BUTTON_SUB_BUTTON_LABEL.DUPLICATE_BUTTON_INFO,
        sqlStr: "select c.loginName, d.swap, a.*, b.totalCount as Duplicate from User c, UserCDI d, Button a inner join (select buttonNumber, parentUserCDIId, count(*) totalCount from Button group by Button.buttonNumber, Button.parentUserCDIId having count(*) >=2) b on b.buttonNumber = a.buttonNumber and b.parentUserCDIId = a.parentUserCDIId where c.userCDIId=a.parentUserCDIId and c.userCDIId=d.id",
        header: ['Login Name', 'Swap', 'ID', 'AutoSignal', 'ButtonLabel', 'ButtonLock',  'ButtonNumber', 'ButtonType', 'Destination', 'divertOnImmorBusytoExtension', 'divertOnRNAtoExtension', 'divertReason', 'icon', 'includeInCallHistory', 'incomingActionCLI', 'incomingActionFloat', 'incomingActionPriority', 'incomingActionRings', 'keySequence', 'personalPointOfContactId', 'pointOfContactId', 'ringTone', 'schemaDifference_blob_reserved', 'schemaDifference_reserved', 'uiName', 'lastModified', 'parentUserCDIId', 'DuplicateTotalCount']
    }
]



