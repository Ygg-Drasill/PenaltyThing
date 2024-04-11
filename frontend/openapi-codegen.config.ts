import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  penaltyThingApi: {
    from: {
      source: "url",
      url: "http://localhost:8080/swagger/doc.json",
    },
    outputDir: "./components/openapi",
    to: async (context) => {
      const filenamePrefix = "penaltyThingApi";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
  penaltyThingApi: {
    from: {
      source: "url",
      url: "http://localhost:8080/swagger/doc.json",
    },
    outputDir: "src/components",
    to: async (context) => {
      const filenamePrefix = "penaltyThingApi";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
  penaltyThingApi: {
    from: {
      source: "url",
      url: "http://localhost:8080/swagger/doc.json",
    },
    outputDir: "src/components/openapi",
    to: async (context) => {
      const filenamePrefix = "penaltyThingApi";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
