class ConflictError extends Error {
  constructor(resource, fieldValue) {
    super(`${resource} with value '${fieldValue}' already exists.`);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

export default ConflictError;
