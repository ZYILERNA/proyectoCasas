import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Aquí podrías hacer un fetch real a Alpha Vantage o Yahoo Finance
    // Por ahora, servimos los datos oficiales de WONLY (SHA: 605268) 
    // basados en la información corporativa.
    
    const stockData = {
      symbol: "605268.SS",
      company: "Wonly Cloud",
      price: 37.66, // Valor de marca de ¥37.66 Billion
      change: "+1.25",
      isUp: true,
      lastUpdate: new Date().toLocaleTimeString()
    };

    return NextResponse.json(stockData);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}