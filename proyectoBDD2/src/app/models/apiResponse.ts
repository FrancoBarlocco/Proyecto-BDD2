export interface ApiResponse {
    success: boolean; // Indica si la operación fue exitosa
    error?: string; // Mensaje de error en caso de que la operación falle
    data?: any; // Datos adicionales de la respuesta, si es necesario
  }
  