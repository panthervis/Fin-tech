declare interface FeaturedContent {
  fields: {
    contentImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    name: string
    title: string
    body: string
    authorImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    authorName: string
    authorPosition: string
  }
  sys: {
    createdAt: Date
  }
}

declare interface ThoughtfulPageData {
  fields?: {
    headerLineOne: string
    headerLineTwo: string
    featuredContentHeader: string
    featuredContents: FeaturedContent[]
    bannerBackgroundImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
  }
}

declare interface Post {
  id: string
  title: string
  published_at: Date
  feature_image: string
  url: string
  excerpt: string
  reading_time: number
  tags: [
    {
      name: string
    }
  ]
  authors: [
    {
      name: string
      profile_image: string
      meta_title: string
    }
  ]
  primary_author: {
    name: string
    profile_image: string
    meta_title: string
  }
}
