import { TriggerClient } from '@trigger.dev/sdk'

export const client = new TriggerClient({
	id: 'todo-T0MI',
	apiKey: process.env.TRIGGER_API_KEY,
	apiUrl: process.env.TRIGGER_API_URL,
})
