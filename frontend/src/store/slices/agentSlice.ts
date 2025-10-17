import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AgentMessage {
  id: string;
  agentType: 'guide' | 'analyzer' | 'content';
  content: string;
  timestamp: number;
}

interface AgentState {
  connected: boolean;
  messages: AgentMessage[];
  activeAgent: string | null;
}

const initialState: AgentState = {
  connected: false,
  messages: [],
  activeAgent: null,
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    connect: (state) => {
      state.connected = true;
    },
    disconnect: (state) => {
      state.connected = false;
    },
    receiveMessage: (state, action: PayloadAction<AgentMessage>) => {
      state.messages.push(action.payload);
    },
    setActiveAgent: (state, action: PayloadAction<string | null>) => {
      state.activeAgent = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { connect, disconnect, receiveMessage, setActiveAgent, clearMessages } =
  agentSlice.actions;
export default agentSlice.reducer;
