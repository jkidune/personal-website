import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "Conservation Tech",
          "Web Application",
          "Videography & Content",
          "Digital Marketing",
          "Content Strategy",
        ],
      },
    }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "industry", type: "string" }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: "fullDescription",
      title: "Full description",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "behanceUrl",
      title: "Behance URL",
      type: "url",
    }),
    defineField({
      name: "vimeoUrl",
      title: "Vimeo URL",
      type: "url",
    }),
    defineField({
      name: "techStack",
      title: "Tech stack",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "services",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "challenge", type: "text", rows: 4 }),
    defineField({ name: "approach", type: "text", rows: 5 }),
    defineField({ name: "deliverables", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "outcome", type: "text", rows: 4 }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alternative text" }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "sortOrder", type: "number" }),
    defineField({
      name: "role",
      type: "string",
      initialValue: "Design & Dev",
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.min(2015).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: "location",
      type: "string",
      initialValue: "Tanzania",
    }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text", rows: 2 }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
