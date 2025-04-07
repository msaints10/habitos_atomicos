export const fetchHabitos = async (token: string) => {
    const response = await fetch("https://backend-g5ia1rc8z-msaints10s-projects.vercel.app/api/habitos", 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (!response.ok) {
        throw new Error("Error fetching habitos");
    }
    return response;
};

export const fetchAgregarHabito = async (titulo: string, descripcion: string, token: string) => {
    const response = await fetch("https://backend-g5ia1rc8z-msaints10s-projects.vercel.app/api/habitos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ "titulo": titulo, "descripcion": descripcion })
    });
    if (!response.ok) {
        throw new Error("Error al agregar el hábito");
    }
    return response;
};

export const marcarHabitoCompletado = async (habitoId: string, token: string) => {
    const response = await fetch(`https://backend-g5ia1rc8z-msaints10s-projects.vercel.app/api/habitos/marcarcompletado/${habitoId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
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