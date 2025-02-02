export function generateRandomData(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    name: `Day ${i + 1}`,
    threats: Math.floor(Math.random() * 50),
    vulnerabilities: Math.floor(Math.random() * 30),
  }))
}

export function generateRandomPieData() {
  return [
    { name: "Network", value: Math.floor(Math.random() * 100) },
    { name: "Application", value: Math.floor(Math.random() * 100) },
    { name: "Data", value: Math.floor(Math.random() * 100) },
    { name: "User", value: Math.floor(Math.random() * 100) },
  ]
}

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

