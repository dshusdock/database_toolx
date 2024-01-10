
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
    }
]



