function generateTickets(numSets) {
    const allAvailableNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
    const tickets = [];
    let setId = 1;
  
    while (numSets > 0) {
      const setTickets = [];
  
      // Generate 6 unique tickets for each set
      for (let i = 0; i < 6; i++) {
        const ticketNumbers = shuffleArray(allAvailableNumbers);
        const ticket = createTicket(ticketNumbers);
  
        // Check for uniqueness within the set and against existing tickets
        const isUnique = setTickets.every(t => !compareTickets(t, ticket)) &&
                         tickets.every(t => !compareTickets(t, ticket));
  
        if (isUnique) {
          setTickets.push(ticket);
          tickets.push({ setId, ticketNumber: i + 1, row1: ticket[0], row2: ticket[1], row3: ticket[2] });
        } else {
          // Regenerate if not unique
          i--;
        }
      }
  
      numSets--;
      setId++;
    }
  
    return tickets;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function createTicket(numbers) {
    const ticket = [[], [], []];
    let colIndex = 0;
    let rowIndex = 0;
  
    for (let i = 0; i < 90; i++) {
      ticket[rowIndex]?.push(numbers[i]);
      colIndex++;
  
      if (colIndex === 9 || i >= 18 && i < 36 || i >= 54 && i < 72 || i >= 81) {
        ticket[rowIndex]?.sort((a, b) => a - b); // Sort numbers within a column
        rowIndex++;
        colIndex = 0;
      }
    }
  
    return ticket;
  }
  
  function compareTickets(ticket1, ticket2) {
    return JSON.stringify(ticket1) === JSON.stringify(ticket2);
  }