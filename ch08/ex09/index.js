export function withResource(resource, callback) {
  try {
    return callback(resource);
  } finally {
    resource.close();
  }
}
