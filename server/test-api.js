// test-api.js - update to this
const res = await fetch('http://localhost:5000/api/openAI/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    message: "When was NovaTech founded?", 
    history: [] 
  })
});
const data = await res.json();
console.log(data);