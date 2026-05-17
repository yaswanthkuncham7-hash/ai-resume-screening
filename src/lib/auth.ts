// Mock authentication for MVP
export const getSession = async () => {
  return {
    user: {
      id: "recruiter_001",
      name: "Jane Doe",
      email: "jane@hirelens.ai",
      role: "RECRUITER",
    },
  }
}
