export type SpecField = {
  key: string
  i18nKey: string
}

const LAPTOP_SPECS: SpecField[] = [
  { key: 'display_size',  i18nKey: 'spec.display_size' },
  { key: 'resolution',    i18nKey: 'spec.resolution' },
  { key: 'cpu',           i18nKey: 'spec.cpu' },
  { key: 'gpu',           i18nKey: 'spec.gpu' },
  { key: 'ram',           i18nKey: 'spec.ram' },
  { key: 'storage',       i18nKey: 'spec.storage' },
  { key: 'battery',       i18nKey: 'spec.battery' },
  { key: 'os',            i18nKey: 'spec.os' },
  { key: 'weight',        i18nKey: 'spec.weight' },
]

const SMARTPHONE_SPECS: SpecField[] = [
  { key: 'display_size',  i18nKey: 'spec.display_size' },
  { key: 'resolution',    i18nKey: 'spec.resolution' },
  { key: 'cpu',           i18nKey: 'spec.cpu' },
  { key: 'ram',           i18nKey: 'spec.ram' },
  { key: 'storage',       i18nKey: 'spec.storage' },
  { key: 'camera',        i18nKey: 'spec.camera' },
  { key: 'battery',       i18nKey: 'spec.battery' },
  { key: '5g',            i18nKey: 'spec.5g' },
  { key: 'os',            i18nKey: 'spec.os' },
]

const HEADPHONE_SPECS: SpecField[] = [
  { key: 'type',             i18nKey: 'spec.type' },
  { key: 'connectivity',     i18nKey: 'spec.connectivity' },
  { key: 'anc',              i18nKey: 'spec.anc' },
  { key: 'battery',          i18nKey: 'spec.battery' },
  { key: 'charging',         i18nKey: 'spec.charging' },
  { key: 'driver_size',      i18nKey: 'spec.driver_size' },
  { key: 'chip',             i18nKey: 'spec.chip' },
  { key: 'water_resistance', i18nKey: 'spec.water_resistance' },
  { key: 'weight',           i18nKey: 'spec.weight' },
]

const TABLET_SPECS: SpecField[] = [
  { key: 'display_size',  i18nKey: 'spec.display_size' },
  { key: 'resolution',    i18nKey: 'spec.resolution' },
  { key: 'cpu',           i18nKey: 'spec.cpu' },
  { key: 'ram',           i18nKey: 'spec.ram' },
  { key: 'storage',       i18nKey: 'spec.storage' },
  { key: 'battery',       i18nKey: 'spec.battery' },
  { key: 'connectivity',  i18nKey: 'spec.connectivity' },
  { key: 'os',            i18nKey: 'spec.os' },
  { key: 'weight',        i18nKey: 'spec.weight' },
]

const TV_SPECS: SpecField[] = [
  { key: 'screen_size',   i18nKey: 'spec.screen_size' },
  { key: 'panel_type',    i18nKey: 'spec.panel_type' },
  { key: 'resolution',    i18nKey: 'spec.resolution' },
  { key: 'refresh_rate',  i18nKey: 'spec.refresh_rate' },
  { key: 'hdr',           i18nKey: 'spec.hdr' },
  { key: 'hdmi_ports',    i18nKey: 'spec.hdmi_ports' },
  { key: 'os',            i18nKey: 'spec.os' },
  { key: 'smart_tv',      i18nKey: 'spec.smart_tv' },
]

export const SPEC_TEMPLATES: Record<string, SpecField[]> = {
  // Top-level categories
  laptops:     LAPTOP_SPECS,
  smartphones: SMARTPHONE_SPECS,
  headphones:  HEADPHONE_SPECS,
  tablets:     TABLET_SPECS,
  tvs:         TV_SPECS,
  // Subcategory aliases
  'macbook':          LAPTOP_SPECS,
  'windows-laptops':  LAPTOP_SPECS,
  'iphone':           SMARTPHONE_SPECS,
  'android-phones':   SMARTPHONE_SPECS,
  'over-ear':         HEADPHONE_SPECS,
  'in-ear':           HEADPHONE_SPECS,
  'ipad':             TABLET_SPECS,
  'android-tablets':  TABLET_SPECS,
  'oled-tvs':         TV_SPECS,
  'mini-led-tvs':     TV_SPECS,
}
