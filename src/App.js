
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@girishsawant999/react-loading-button';
import { FiCheck } from "react-icons/fi";
import './global.css'
import './styles.css'

const schema = yup.object({
title: yup.string().required('O título é obrigatório').min(6, 'Mínimo de caracteres permitos é 6').max(40, 'Máximo de caracteres permitos é 40'),
description: yup.string().required('A descrição é obrigatória').min(6,'Mínimo de caracteres permitos é 6').max(20, 'Máximo de caracteres permitidos é 20'),
content: yup.string().required('O conteúdo é obrigatório').max(140, 'Máximo 140 caracteres'),
}).required();


function App() {

	const { register, handleSubmit,   formState:{ errors} } = useForm({
		resolver: yupResolver(schema)
	})

 // const { isSubmitting, isSubmitSuccessful,  } = formState

 // const onSubmitForm = data => console.log(data)

const [isSubmitting, setIsSubmitting] = useState(false);
const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const formRef = useRef(); 

const onSubmitForm = data => {
  setIsSubmitting(true);
  setTimeout(() => {
    fetch('http://localhost:3000/posts',{
      method: 'POST',
      body: JSON.stringify({
        data
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
	.then(response => response.json())
    .then(() => {
        setIsSubmitting(false);
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
		formRef.current.reset();
    }).catch(err => console.log(err))
  }, 2000);
}

	return (
		<div className="app">
			<form ref={formRef} onSubmit={handleSubmit(onSubmitForm)} >
				<h1>Criar publicação</h1>


				<div className='field' >
					<label className='label'>Título</label>
					<input type="text" {...register('title')}/>
					<p>{errors.title?.message}</p>

				</div>

				<div className='field' >
					<label>Descrição</label>
					<input type="text" {...register('description')} />
					<p>{errors.description?.message}</p>

				</div>

				<div className='field' >
					<label>Conteúdo</label>
					<input type="text" {...register('content')}/>
					<p>{errors.content?.message}</p>

				</div>

				{/* <button type="submit" disabled={isSubmitting}
				className={isSubmitting ? 'loading' : ''}
				>
           Publicar
           </button> */}
		   
		   {showSuccessMessage ? <Button buttonType='success'>
			<FiCheck className='Icon'/>
			<t className='tracking-in-contract'>Publicado</t> </Button>
			 : <Button buttonType='info' loader='puff' loading={isSubmitting}>
			{isSubmitting ? 'Enviando ' : 'Publicar'}</Button> }
			</form>
		</div>
	);
}

export default App;
