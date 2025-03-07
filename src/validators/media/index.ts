import { validator } from "~/helpers";

export const MediaDeletePayloadValidator = validator.generate<{
  keys: string[];
}>({
  keys: validator.array(validator.string(), { defaultValue: [] }),
});
