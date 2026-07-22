const Expense = require("../models/Expense");

const getExpense = async (req,res) =>{
   try {
      const getexpense = await Expense.find();
      res.status(200).json(getexpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
}

const getExpenseById = async (req,res) =>{
  try {
    const expenseid = await Expense.findById(req.params.id);

    if (expenseid == null) {
      return res.status(404).json({ message: "Expense Not Found" });
    }

    res.status(200).json(expenseid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}



const createExpense = async (req,res) =>{
try {
    const { title, amount, category } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
    message: "Please fill out all details"
});
    }

    if (typeof amount !== "number"){
      return res.status(400).json({message: "Amount must be a number"})
    }

    /*if( amount <= 0){
      return res.status(400).json({message: "Amount must be greater than 0"})
    }*/

    const expense = await Expense.create({ title, amount, category });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateExpense = async(req,res) => {
  try {
    const update = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (update == null) {
      return res.status(404).json({ message: "Expense Not Found" });
    }

    res.status(200).json(update);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteExpense = async(req,res) =>{
  try {
      const del = await Expense.findByIdAndDelete(req.params.id);
  
      if (del == null) {
        return res.status(404).json({ message: "Expense Not Found" });
      }
  
      res.status(200).json({
        message: "Expense deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {
  createExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};