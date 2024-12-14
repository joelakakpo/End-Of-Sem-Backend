useEffect(() => {
    const fetchStatusUpdates = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/orders/${order.id}/status`);
        const data = await response.json();
        setStatus(data.currentStatus);
        setStatusHistory((prevHistory) => [...prevHistory, data.currentStatus]);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };
  
    const interval = setInterval(fetchStatusUpdates, 5000); // Polling every 5 seconds
  
    return () => clearInterval(interval);
  }, [order.id]);
  