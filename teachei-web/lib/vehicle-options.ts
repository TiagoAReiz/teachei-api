/**
 * Vehicle optional features for buyer intentions.
 */
export const vehicleOptions = [
  { value: "VIDRO_ELETRICO", label: "Vidro Elétrico", icon: "square" },
  { value: "AR_CONDICIONADO", label: "Ar Condicionado", icon: "snowflake" },
  { value: "DIRECAO_HIDRAULICA", label: "Direção Hidráulica", icon: "circle" },
  { value: "DIRECAO_ELETRICA", label: "Direção Elétrica", icon: "zap" },
  { value: "TETO_SOLAR", label: "Teto Solar", icon: "sun" },
  { value: "BANCOS_COURO", label: "Bancos de Couro", icon: "armchair" },
  { value: "SENSOR_ESTACIONAMENTO", label: "Sensor de Estacionamento", icon: "radar" },
  { value: "CAMERA_RE", label: "Câmera de Ré", icon: "camera" },
  { value: "MULTIMIDIA", label: "Central Multimídia", icon: "monitor" },
  { value: "BLUETOOTH", label: "Bluetooth", icon: "bluetooth" },
  { value: "AIRBAG", label: "Airbag", icon: "shield" },
  { value: "ABS", label: "Freios ABS", icon: "circle-stop" },
  { value: "ALARME", label: "Alarme", icon: "bell" },
  { value: "RODAS_LIGA", label: "Rodas de Liga", icon: "circle" },
  { value: "PILOTO_AUTOMATICO", label: "Piloto Automático", icon: "gauge" },
] as const;

export type VehicleOption = typeof vehicleOptions[number]["value"];
