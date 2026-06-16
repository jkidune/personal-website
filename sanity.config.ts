import { DocumentTextIcon, ImagesIcon } from "@sanity/icons";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Joseph Personal Website",
  projectId: "36x1zm20",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("project").title("Projects").icon(ImagesIcon),
            S.documentTypeListItem("article").title("Articles").icon(DocumentTextIcon),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
