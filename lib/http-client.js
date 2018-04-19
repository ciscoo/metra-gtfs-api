const got = require("got");
const { url, resources } = require("./metra-routes");
const { mapScheduleRoutes } = require("./util");

const jsonResources = resources.json;
const rawResources = resources.raw;

let stopTimesByIdAction;
let client = {};

for (const resource of jsonResources) {
  let parts;

  if (resource.includes("/")) {
    parts = resource.split("/");
  }

  if (parts && parts.length === 2) {
    let key;

    if (parts[0].includes(".")) {
      let functionName = parts[0].split(".")[1];
      let [first, second] = functionName.split("_");

      functionName = `${first}${second[0].toUpperCase()}${second.slice(1)}`;
      functionName = `${functionName}ById`;

      stopTimesByIdAction = {
        [functionName]: tripId => {
          const uri = resource.replace(parts[1], tripId);
          return got(`${url}/${uri}`);
        }
      };

      continue;
    }

    key = parts[0];

    if (!client.hasOwnProperty(key)) {
      client[key] = {};
    }

    let functionName = parts[1];
    if (functionName.includes("_")) {
      const [first, second] = functionName.split("_");
      functionName = `${first}${second[0].toUpperCase()}${second.slice(1)}`;
    }

    const action = {
      [functionName]: () => got(`${url}/${resource}`)
    };

    if (client.hasOwnProperty(key)) {
      Object.assign(client[key], action);
      if (stopTimesByIdAction) {
        Object.assign(client[key], stopTimesByIdAction);
      }
    }
    continue;
  }

  client[resource] = () => got(`${url}/${resource}`);
}

for (const resource of rawResources) {
  const parts = resource.split("/")
  const key = parts[0]
  const functionName = parts[1].split(".")[0]
  if (!client.hasOwnProperty(key)) {
    client[key] = {};
  }
  const action = {
    [functionName]: () => got(`${url}/${resource}`)
  }
  Object.assign(client[key], action)
}
