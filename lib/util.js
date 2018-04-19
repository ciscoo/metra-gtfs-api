exports.mapScheduleRoutes = (client, resource) => {
  const updatedClient = Object.assign({}, client)
  const parts = resource.split("/")
  if (!parts || parts.length !== 2) {
    throw new Error("Invalid schedule resource route.")
  }
  let key
  if (parts[0].includes(".")) {
  }
  key = parts[0]
};
