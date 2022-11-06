import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import * as employeeService from "../../services/employeeService";



const initialFValues = {
    username: '',
    password: ''
}

export default function HRLogIn(props) {

    const {setHRValidated,setNotify}= props


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length != 0 ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const invalid = () => {
        setNotify({
            isOpen: true,
            message: 'Username or password is invalid',
            type: 'error'
        })
    }
    const valid=()=>{
        setNotify({
            isOpen: true,
            message: 'HR Logged in successfully',
            type: 'success'
        })
        setHRValidated(true)
    }

    const authenticateHR = async () => {
        await employeeService.authenticateHR(values,valid,invalid)
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            authenticateHR()
        }
    }
    return (
        <div>
            <PageHeader
                title="HR Manager"
                subTitle="Log in"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            name="username"
                            label="Username"
                            value={values.username}
                            onChange={handleInputChange}
                            error={errors.username}
                        />
                        <Controls.Input
                            label="Password"
                            name="password"
                            type='password'
                            value={values.password}
                            onChange={handleInputChange}
                            error={errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} />
                        </div>
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
}
