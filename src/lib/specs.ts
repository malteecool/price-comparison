export type SpecField = {
  key: string
  i18nKey: string
}

export const SPEC_TEMPLATES: Record<string, SpecField[]> = {
  laptops: [
    { key: 'display_size',  i18nKey: 'spec.display_size' },
    { key: 'resolution',    i18nKey: 'spec.resolution' },
    { key: 'cpu',           i18nKey: 'spec.cpu' },
    { key: 'gpu',           i18nKey: 'spec.gpu' },
    { key: 'ram',           i18nKey: 'spec.ram' },
    { key: 'storage',       i18nKey: 'spec.storage' },
    { key: 'battery',       i18nKey: 'spec.battery' },
    { key: 'os',            i18nKey: 'spec.os' },
    { key: 'weight',        i18nKey: 'spec.weight' },
  ],
  smartphones: [
    { key: 'display_size',  i18nKey: 'spec.display_size' },
    { key: 'resolution',    i18nKey: 'spec.resolution' },
    { key: 'cpu',           i18nKey: 'spec.cpu' },
    { key: 'ram',           i18nKey: 'spec.ram' },
    { key: 'storage',       i18nKey: 'spec.storage' },
    { key: 'camera',        i18nKey: 'spec.camera' },
    { key: 'battery',       i18nKey: 'spec.battery' },
    { key: '5g',            i18nKey: 'spec.5g' },
    { key: 'os',            i18nKey: 'spec.os' },
  ],
  headphones: [
    { key: 'type',            i18nKey: 'spec.type' },
    { key: 'connectivity',    i18nKey: 'spec.connectivity' },
    { key: 'anc',             i18nKey: 'spec.anc' },
    { key: 'battery',         i18nKey: 'spec.battery' },
    { key: 'charging',        i18nKey: 'spec.charging' },
    { key: 'driver_size',     i18nKey: 'spec.driver_size' },
    { key: 'chip',            i18nKey: 'spec.chip' },
    { key: 'water_resistance',i18nKey: 'spec.water_resistance' },
    { key: 'weight',          i18nKey: 'spec.weight' },
  ],
  tablets: [
    { key: 'display_size',  i18nKey: 'spec.display_size' },
    { key: 'resolution',    i18nKey: 'spec.resolution' },
    { key: 'cpu',           i18nKey: 'spec.cpu' },
    { key: 'ram',           i18nKey: 'spec.ram' },
    { key: 'storage',       i18nKey: 'spec.storage' },
    { key: 'battery',       i18nKey: 'spec.battery' },
    { key: 'connectivity',  i18nKey: 'spec.connectivity' },
    { key: 'os',            i18nKey: 'spec.os' },
    { key: 'weight',        i18nKey: 'spec.weight' },
  ],
  tvs: [
    { key: 'screen_size',   i18nKey: 'spec.screen_size' },
    { key: 'panel_type',    i18nKey: 'spec.panel_type' },
    { key: 'resolution',    i18nKey: 'spec.resolution' },
    { key: 'refresh_rate',  i18nKey: 'spec.refresh_rate' },
    { key: 'hdr',           i18nKey: 'spec.hdr' },
    { key: 'hdmi_ports',    i18nKey: 'spec.hdmi_ports' },
    { key: 'os',            i18nKey: 'spec.os' },
    { key: 'smart_tv',      i18nKey: 'spec.smart_tv' },
  ],
}
