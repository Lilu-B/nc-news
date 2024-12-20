function buildQueryParams ({ topic, sortBy = 'created_at', order = 'desc' } = {}) {
    return new URLSearchParams({
      ...(topic && { topic }),
      sort_by: sortBy,
      order: order,
    }).toString();
  };
  
  export default buildQueryParams;