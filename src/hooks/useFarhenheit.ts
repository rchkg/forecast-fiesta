export const useFarhenheit = (temperature: number) => {
    const temp = (temperature - 273.15)*(9/5) + 32
    
    return temp
};
