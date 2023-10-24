import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"


function editExpensesForm(){
    
    const history = useHistory()

    const [expense, setExpense] = useState({
        category: '',
        subcategory: '',
        recurrung: '',
        amount:'',
    })

        useEffect(() => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:5000/expenses/${expenseId}`)
                const resData = await response.json()
                setExpense(resData)
            }
            fetchData()
        }, [ expenseId ])
    
        async function handleSubmit(e) {
            e.preventDefault()
    
            await fetch(`http://localhost:5000/expenses/${expense.expenseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(place)
            })
    
            history.push(`/expenses/${expense.placeId}`)
        }
    
        return (
            <main>
                <h1>Edit Expenses</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Category</label>
                        <input
                            required
                            value={expense.category}
                            onChange={e => setExpense({ ...expense, category e.target.value })}
                            className="form-control"
                            id="category"
                            name="category"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="founded">Subcategory</label>
                        <input
                            required
                            value={expense.subcategory}
                            onChange={e => setExpense({ ...expense, subcategory: e.target.value })}
                            className="form-control"
                            id="subcategory"
                            name="subcategory"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pic">Recurring</label>
                        <input
                            value={expense.recurring}
                            onChange={e => setExpense({ ...expense, recurring: e.target.value })}
                            className="form-control"
                            id="recurring"
                            name="recurring"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Amount</label>
                        <input
                            value={expense.amount}
                            onChange={e => setExpense({ ...expense, amount: e.target.value })}
                            className="form-control"
                            id="amount"
                            name="amount"
                        />
                    </div>

                    <input className="btn-primary" type="submit" value="Save" />
                </form>
            </main>
    )
        }
export default editExpensesForm

