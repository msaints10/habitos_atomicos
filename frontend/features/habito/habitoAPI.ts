export const fetchHabitos = async () => {
    const response = await fetch("http://localhost:3002/api/habitos");
    if (!response.ok) {
        throw new Error("Error fetching habitos");
    }
    return response.json();
};