declare interface Team {
  fields: {
    teamName: string
    teamRole: string
    order: number
    members: TeamMember[]
  }
}

declare interface TeamMember {
  fields: {
    name: string
    position: string
    title: string
    phoneNumber: string
    profileImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    secondaryProfileImage?: {
      fields: {
        file: {
          url: string
        }
      }
    }
    description: string[]
    quote: string
    email: string
  }
  sys: {
    id: string
  }
}

declare interface TeamPageData {
  fields?: {
    pageName: string
    teams: Team[]
  }
}
