
import { BTN_SQL_QUERIES_MAP_DEF } from 'src/models/constants';
import { SYSTEM_SUB_BUTTON_LABEL } from '../../models/button-data';

export const BTN_SQL_QUERIES_MAP: BTN_SQL_QUERIES_MAP_DEF[]  = [
    {
        type: SYSTEM_SUB_BUTTON_LABEL.ENTERPISE_INFO,
        sqlStr: "select d.name as EnterpriseName, d.domainName as EnterpriseDomainName, c.name as InstanceName, c.domainName as InstanceDomainName, a.id as ZoneId, a.certificateAuthorityIP, a.name, a.softwareVersion, b.replicationEnabled, b.replicationRole from Zone a, InterzoneCommConfigZone b, Instance c, Enterprise d where d.id=c.parentEnterpriseId and c.id=a.parentInstanceId and b.id=a.interzoneCommConfigZoneId",
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
    }
]



