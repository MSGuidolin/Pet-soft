export const validateAddress = (data) => {
    const errors = {};
    if (!data.name || typeof data.name !== 'string') errors.name = true
    if (!data.country || typeof data.country !== 'string') errors.country = true
    if (!data.state || typeof data.state !== 'string') errors.state = true
    if (!data.city || typeof data.city !== 'string') errors.city = true
    if (!data.address_1 || typeof data.address_1 !== 'string') errors.address_1 = true
    if (!data.zip_code) errors.zip_code = true
    return errors
}