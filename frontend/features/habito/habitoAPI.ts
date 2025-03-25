export const fetchHabitos = async () => {
    const response = await fetch("http://localhost:3002/api/habitos");
    if (!response.ok) {
        throw new Error("Error fetching habitos");
    }
    return response.json();
};

export const marcarHabitoCompletado = async (habitoId: string) => {
    const response = await fetch(`http://localhost:3002/api/habitos/marcarcompletado/${habitoId}`, {
        method: "PATCH"
    });
    const responseJson = await response.json();
    if (!response.ok) {
        return {code: -999, mensaje: "Error al marcar el hábito como completado"}; // Error
    } else if (responseJson.mensaje.toString() === "Hábito reiniciado") {
        return {code: 0, mensaje: responseJson.mensaje}; // Hábito reiniciado
    } else {
        return {code: 1, mensaje: responseJson.mensaje}; // Hábito marcado como completado
    }
};