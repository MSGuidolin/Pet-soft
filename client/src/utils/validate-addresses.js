export const validateAddress = (data) => {
    const errors = {};
    if (!data.name || typeof data.name !== 'string') errors.name = true
    if (!data.country || typeof data.country !== 'string') errors.country = true
    if (!data.state || typeof data.state !== 'string') errors.state = true
    if (!data.city || typeof data.city !== 'string') errors.city = true
    if (!data.direction || typeof data.direction !== 'string') errors.direction = true
    if (!data.postal_code) errors.postal_code = true
    return errors
}