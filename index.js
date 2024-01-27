const express = require('express');
const axios = require('axios');
const app = express();

const CRM_API_KEY = 'jiEkM_OGtBwFOonIMq13KQ'; // Replace with your actual token
const CRM_API_URL = 'https://abdulsuhaib07.myfreshworks.com/crm/sales/api/contacts';

// console.log(API_URL)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/api/createContact',async(req, res) => {
    try {
        const { first_name, last_name, email, mobile_number } = req.body;

      // Create contact in CRM
      const response = await axios.post(CRM_API_URL, {
        contact: {
          first_name,
          last_name,
          email,
          mobile_number,
        },
      }, {
        headers: {
          'Authorization': `Token token=${CRM_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      res.json(response.data);
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating contact');
    }

})

app.get('/api/getContact/:id',async(req, res)=>{
    try {
        const {id} = req.params

        const response = await axios.get(`${CRM_API_URL}/${id}`,{
            headers: {
                'Authorization': `Token token=${CRM_API_KEY}`,
                'Content-Type': 'application/json',
              },
        })

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting contact');
    }
})

app.post('/api/updateContact/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const {email , mobile_number} = req.body

        const response = await axios.put(`${CRM_API_URL}/${id}`,{
            contact:{
                email,
                mobile_number
            }
        },{
            headers: {
                'Authorization': `Token token=${CRM_API_KEY}`,
                'Content-Type': 'application/json',
              },
        })
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting contact');
    }
})



app.listen(3000,()=>{
    console.log('listening on port 3000')
})