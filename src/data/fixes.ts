import type { FixOption } from '../types'

export const FIXES: FixOption[] = [
  { id: 'reseat_pv_connector', label: 'Re-seat and repair the PV MC4 connector' },
  { id: 'correct_pv_polarity', label: 'Correct the reversed PV string polarity' },
  { id: 'dry_and_reseal_gland', label: 'Dry out and re-seal the cable gland / entry point' },
  { id: 'replace_dc_cable', label: 'Replace the damaged DC cable run' },
  { id: 'power_cycle_inverter', label: 'Power-cycle the inverter to reset the relay self-check' },
  { id: 'escalate_rma_relay', label: 'Log an RMA — internal relay hardware fault' },
  { id: 'check_upstream_breaker', label: "Check the customer's upstream breaker / utility supply" },
  { id: 'contact_utility_voltage', label: 'Report abnormal grid voltage to the utility provider' },
  { id: 'upsize_ac_cable', label: 'Upsize the AC cable run to reduce voltage rise' },
  { id: 'reseat_battery_comms', label: 'Re-seat the battery communication cable' },
  { id: 'replace_comms_cable', label: 'Replace the damaged RS485 communication cable' },
  { id: 'fix_rs485_termination', label: 'Correct RS485 wiring polarity and bus termination' },
  { id: 'reverse_ct_orientation', label: 'Reverse the CT clamp orientation on the cable' },
  { id: 'reconfigure_export_limit', label: 'Reconfigure the export limit setting in SolarGo' },
  { id: 'inspect_replace_dc_connector', label: 'Inspect and replace the arcing DC connector' },
  { id: 'clean_fan_assembly', label: 'Clean or replace the cooling fan assembly' },
  { id: 'firmware_reflash', label: 'Reflash inverter firmware to the latest stable version' },
  { id: 'no_fault_found', label: 'No fault found — advise customer it is normal operation' },
]

export const FIX_MAP = Object.fromEntries(FIXES.map((f) => [f.id, f]))
