import type { Tool } from '../types'

export const TOOLS: Tool[] = [
  {
    id: 'visual',
    name: 'Visual Inspection',
    shortName: 'Visual',
    description: 'Your own two eyes. Free, but slow — always worth a look first.',
    unlockedByDefault: true,
  },
  {
    id: 'multimeter',
    name: 'Digital Multimeter',
    shortName: 'Multimeter',
    description: 'Measures DC and AC voltage at the terminals.',
    unlockedByDefault: true,
  },
  {
    id: 'clamp_meter',
    name: 'Clamp Meter',
    shortName: 'Clamp Meter',
    description: 'Reads current without breaking the circuit — good for CT and load checks.',
    unlockedByDefault: true,
  },
  {
    id: 'megger',
    name: 'Megger (Insulation Tester)',
    shortName: 'Megger',
    description: 'Tests insulation resistance on DC strings. Essential after rain.',
    unlockedByDefault: true,
  },
  {
    id: 'solargo',
    name: 'SolarGo App',
    shortName: 'SolarGo',
    description: "Bluetooth-connects to the inverter for live status and fault codes.",
    unlockedByDefault: true,
  },
  {
    id: 'sems',
    name: 'SEMS Portal',
    shortName: 'SEMS',
    description: 'Cloud monitoring platform — history, alarms, and remote data.',
    unlockedByDefault: true,
  },
  {
    id: 'rs485_tester',
    name: 'RS485 Bus Tester',
    shortName: 'RS485 Tester',
    description: 'Checks comms bus integrity between inverter, meter, and battery.',
    unlockedByDefault: false,
  },
  {
    id: 'laptop',
    name: 'Field Laptop',
    shortName: 'Laptop',
    description: 'Firmware tool, wiring diagrams, and full configuration access.',
    unlockedByDefault: false,
  },
]
