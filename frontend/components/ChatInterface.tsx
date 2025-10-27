'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ResultsVisualization from './ResultsVisualization';
import { runSimulation, SimulationResponse } from '@/lib/api';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  results?: SimulationResponse;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SimulationResponse | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || loading) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Run simulation
      const response = await runSimulation(message);

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: formatResults(response.results),
        timestamp: new Date(),
        results: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setResults(response);

      // Clear input will be handled by ChatInput component
    } catch (error) {
      console.error('Error running simulation:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error running the simulation. Please try again or check if the backend is running.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatResults = (results: SimulationResponse['results']): string => {
    return `Simulation completed successfully!\n\nTotal Energy Consumption: ${results.total_energy.toLocaleString()} kWh\n\nBreakdown:\n- Cooling: ${results.energy_by_type.cooling.toLocaleString()} kWh\n- Heating: ${results.energy_by_type.heating.toLocaleString()} kWh\n- Lighting: ${results.energy_by_type.lighting.toLocaleString()} kWh\n- Equipment: ${results.energy_by_type.equipment.toLocaleString()} kWh\n- Ventilation: ${results.energy_by_type.ventilation.toLocaleString()} kWh`;
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 bg-bg-dark">
        {/* Header */}
        <div className="bg-bg-medium border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">EnergyPlus Chat Interface</h1>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span>Connected</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Welcome to EnergyPlus Chat</h2>
                <p className="text-text-muted">
                  Send a message to run building energy simulations
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-text-muted mt-6">
              <div className="loading-spinner w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full"></div>
              <span>Running simulation...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} loading={loading} />
      </div>

      {/* Results Visualization Sidebar */}
      {results && (
        <ResultsVisualization results={results} onClose={() => setResults(null)} />
      )}
    </div>
  );
}

