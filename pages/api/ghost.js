import GhostContentAPI from "@tryghost/content-api"
import _ from "underscore"

export default async (req, res) => {
  const api = GhostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_CONTENT_API_KEY,
    version: "v3",
  })

  let filter = `tag:-fr`
  if (req.query.locale === "fr-CA") {
    filter = `tag:fr`
  }
  var data = await api.posts.browse({
    limit: 5000,
    filter: filter,
    include: ["tags", "authors"],
  })
  //get Featured Posts
  var response = {
    featured: [],
    press: [],
    product_updates: [],
    macro_commentary: [],
    op_ed: [],
  }
  Object.keys(data).forEach(function(key) {
    if (data[key].featured) {
      response.featured.push(data[key])
    }
    if (data[key].tags) {
      _.each(
        [
          "id",
          "uuid",
          "slug",
          "comment_id",
          "html",
          "visibility",
          "created_at",
          "updated_at",
          "authors",
          "primary_tag",
          "custom_excerpt",
          "codeinjection_head",
          "codeinjection_foot",
          "custom_template",
          "canonical_url",
          "send_email_when_published",
          "og_image",
          "og_title",
          "og_description",
          "twitter_image",
          "twitter_title",
          "twitter_description",
          "meta_title",
          "meta_description",
          "email_subject",
        ],
        function(field) {
          delete data[key][field]
        }
      )
      _.each(
        [
          "id",
          "slug",
          "cover_image",
          "bio",
          "website",
          "location",
          "facebook",
          "twitter",
          "meta_description",
          "url",
        ],
        function(field) {
          delete data[key].primary_author[field]
        }
      )
      if (data[key].excerpt) {
        data[key].excerpt = data[key].excerpt.split("\n")[0]
      }
      data[key].tags = _.without(
        data[key].tags,
        _.findWhere(data[key].tags, {
          name: req.query.locale === "fr-CA" ? "fr" : "en",
        })
      )
      Object.keys(data[key].tags).forEach(function(tagkey) {
        _.each(
          [
            "id",
            "description",
            "feature_image",
            "visibility",
            "meta_title",
            "meta_description",
            "url",
          ],
          function(field) {
            delete data[key].tags[tagkey][field]
          }
        )
        if (data[key].tags[tagkey].slug == "hash-press") {
          response.press.push(data[key])
        } else if (data[key].tags[tagkey].slug == "hash-product-updates") {
          response.product_updates.push(data[key])
        } else if (data[key].tags[tagkey].slug == "hash-macro-commentary") {
          response.macro_commentary.push(data[key])
        } else if (data[key].tags[tagkey].slug == "hash-op-ed") {
          response.op_ed.push(data[key])
        }
      })
    }
  })
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "max-age=1800")
  res.statusCode = 200
  res.end(JSON.stringify(await response))
}
