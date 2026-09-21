import type { Check } from '../types'

export const CHECKS: Check[] = [
  {
    id: 'visual_inspection',
    toolId: 'visual',
    label: 'Visual Inspection',
    actionVerb: 'Inspect',
  },
  {
    id: 'multimeter_pv',
    toolId: 'multimeter',
    label: 'PV String Voltage',
    actionVerb: 'Measure',
    unit: 'V DC',
  },
  {
    id: 'multimeter_ac',
    toolId: 'multimeter',
    label: 'AC Output Voltage',
    actionVerb: 'Measure',
    unit: 'V AC',
  },
  {
    id: 'clamp_meter_current',
    toolId: 'clamp_meter',
    label: 'Line Current',
    actionVerb: 'Clamp',
    unit: 'A',
  },
  {
    id: 'megger_insulation',
    toolId: 'megger',
    label: 'Insulation Resistance',
    actionVerb: 'Test',
    unit: 'MΩ',
  },
  {
    id: 'solargo_status',
    toolId: 'solargo',
    label: 'Inverter Status & Fault Code',
    actionVerb: 'Scan',
  },
  {
    id: 'sems_portal',
    toolId: 'sems',
    label: 'SEMS History & Alarms',
    actionVerb: 'Check',
  },
  {
    id: 'rs485_test',
    toolId: 'rs485_tester',
    label: 'RS485 Bus Continuity',
    actionVerb: 'Test',
  },
]

export const CHECK_MAP = Object.fromEntries(CHECKS.map((c) => [c.id, c])) as Record<
  string,
  Check
>
