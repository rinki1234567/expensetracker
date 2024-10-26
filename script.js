
document.addEventListener('DOMContentLoaded', () => {
                                                                      
    
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

   
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  
    function renderExpenses() {

        expenseList.innerHTML = '';
        let total = 0;
        
       
        expenses.forEach((expense, index) => {
            const tr = document.createElement('tr'); 
            tr.innerHTML = `
                <td>${expense.name}</td> 
                <td>$${expense.amount}</td> 
                <td>${expense.category}</td>
                <td>${expense.date || 'N/A'}</td> 
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>`;
            expenseList.appendChild(tr); 
            total += Number(expense.amount); 
        });

        
        totalAmount.textContent = total;
    }


    function saveToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses)); 
    }

   
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
       
        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = document.getElementById('expense-amount').value;
        const expenseCategory = document.getElementById('expense-category').value;
        const expenseDate = document.getElementById('expense-date').value;

       
        if (expenseName && expenseAmount > 0 && expenseCategory) {
            
            expenses.push({
                name: expenseName,
                amount: expenseAmount,
                category: expenseCategory,
                date: expenseDate
            });

            
            saveToLocalStorage();
            renderExpenses();

           
            expenseForm.reset();
        } else {
            
            alert("Please fill in all required fields correctly.");
        }
    });

    
    expenseList.addEventListener('click', (e) => {
      
        if (e.target.classList.contains('delete-btn')) {
           
            expenses.splice(e.target.dataset.index, 1);

           
            saveToLocalStorage();
            renderExpenses();

        
        } else if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index; 
            const expense = expenses[index];
            document.getElementById('expense-name').value = expense.name;
            document.getElementById('expense-amount').value = expense.amount;
            document.getElementById('expense-category').value = expense.category;
            document.getElementById('expense-date').value = expense.date;

           
            expenses.splice(index, 1);

            saveToLocalStorage();
            renderExpenses();
        }
    });

   
    renderExpenses();
});
