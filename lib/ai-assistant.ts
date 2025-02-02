type AIResponse = {
  answer: string
  relatedActions: string[]
}

const knowledgeBase: Record<string, AIResponse> = {
  firewall: {
    answer:
      "A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies. It acts as a barrier between trusted internal networks and untrusted external networks, such as the Internet.",
    relatedActions: ["Review firewall rules", "Update firewall settings", "Conduct a firewall penetration test"],
  },
  phishing: {
    answer:
      "Phishing is a cybercrime in which a target is contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.",
    relatedActions: [
      "Conduct employee phishing awareness training",
      "Implement email filtering solutions",
      "Set up multi-factor authentication",
    ],
  },
  encryption: {
    answer:
      "Encryption is the process of encoding information in such a way that only authorized parties can access it. It converts data into a form, called ciphertext, that appears random to anyone who doesn't have the decryption key.",
    relatedActions: [
      "Review data encryption policies",
      "Implement end-to-end encryption for sensitive communications",
      "Conduct an encryption audit",
    ],
  },
  malware: {
    answer:
      "Malware, short for malicious software, is any software intentionally designed to cause damage to a computer, server, client, or computer network. This can include viruses, trojans, spyware, and ransomware.",
    relatedActions: ["Update antivirus software", "Conduct a malware scan", "Implement application whitelisting"],
  },
}

export function getAIResponse(query: string): AIResponse {
  const lowercaseQuery = query.toLowerCase()

  for (const [keyword, response] of Object.entries(knowledgeBase)) {
    if (lowercaseQuery.includes(keyword)) {
      return response
    }
  }

  return {
    answer:
      "I'm sorry, I don't have specific information about that topic. Could you try rephrasing your question or asking about a different cybersecurity concept?",
    relatedActions: [
      "Consult cybersecurity documentation",
      "Contact IT support for more information",
      "Research the topic online from reputable sources",
    ],
  }
}

