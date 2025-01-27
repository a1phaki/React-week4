import { useEffect, useRef , useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as bootstrap from "bootstrap";

import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';

function ProductsPage ({getProducts,products,pageInfo,base_url,api_path}){

    const [modalType,setModalType] = useState('');

    const handlePageChange = (e,page)=>{
        e.preventDefault();
        getProducts(page);
    }
    const productModalRef = useRef(null);
    
    useEffect(()=>{
        productModalRef.current = new bootstrap.Modal("#productModal", {
            keyboard: false,
        });
        
    },[])

    const [selectedProduct,setSelectedProduct] = useState({
        id: "",
        imageUrl: "",
        title: "",
        category: "",
        num:"",
        unit: "",
        originPrice: "",
        price: "",
        description: "",
        content: "",
        isEnabled: false,
        imagesUrl: [''],
        notice:"",
    });

    const openModal = (product,type) => {
        setSelectedProduct({
          id: product.id || "",
          imageUrl: product.imageUrl || "",
          title: product.title || "",
          category: product.category || "",
          num: product.num || "",
          unit: product.unit || "",
          originPrice: product.origin_price || "",
          price: product.price || "",
          description: product.description || "",
          content: product.content || "",
          isEnabled: product.isEnabled || false,
          imagesUrl: product.imagesUrl || [''],
          notice: product.notice || '無注意事項'
        });
        productModalRef.current.show();
        setModalType(type);
    }
    
    const closeModal = () => {
        productModalRef.current.hide();
    };

    const handleModalInputChange = (e)=>{
        const { id, value, type, checked } = e.target;
        setSelectedProduct((prevData)=>({
          ...prevData,
          [id]: type === 'checkbox' ? checked : value
        }))
    }
    
    const handleImageChange = (index,value) =>{

        setSelectedProduct((prevData)=>{

        const newImages = [...prevData.imagesUrl];
        newImages[index]=value;
        if (
            value !== "" &&
            index === newImages.length - 1 &&
            newImages.length < 5
        ) {
            newImages.push("");
        }

        if (newImages.length > 1 && newImages[newImages.length - 1] === "") {
            newImages.pop();
        }

        return { ...prevData, imagesUrl: newImages };
        
        })
    }

    const handleAddImage = ()=>{
        setSelectedProduct((prevData)=>({
        ...prevData,
        imagesUrl:[...prevData.imagesUrl,'']
        }));
    }

    const handleRemoveImage = ()=>{
        setSelectedProduct((prevData)=>{
        const newImages = [...prevData.imagesUrl];
        newImages.pop();
        return {...prevData,imagesUrl: newImages}
        });
    }

    const deleteProduct = async (id)=>{
        try {
          const res = await axios.delete(`${base_url}/api/${api_path}/admin/product/${id}`);
          productModalRef.current.hide();
          getProducts();
        } catch (error) {
          alert(error.response.data.message);
        }
    }
    
    const updateProduct = async (id)=>{

        const productData = {
            data:{
            ...selectedProduct,
            origin_price: Number(selectedProduct.originPrice),
            price: Number(selectedProduct.price),
            is_enabled: selectedProduct.isEnabled ? 1 : 0,
            imagesUrl: selectedProduct.imagesUrl,
            notice: selectedProduct.notice
            },
        };

        try {
            if(modalType === 'edit'){
                const res = await axios.put(`${base_url}/api/${api_path}/admin/product/${id}`,productData);

            }else{
                const res = await axios.post(`${base_url}/api/${api_path}/admin/product`,productData);
            }

            productModalRef.current.hide();
            getProducts();

        } catch (error) {
            if(modalType === 'edit'){
                alert('更新失敗:',error.response.data.message);
            }else{
                alert('新增失敗:',error.response.data.message);
            }
        }
    }

    const handleFileChange = async(e) =>{
        const file = e.target.files[0];
    
        const formData = new FormData();
        formData.append('file-to-upload',file);
    
        try {
            const res = await axios.post(`${base_url}/api/${api_path}/admin/upload`,
            formData);
            const uploadImageUrl = res.data.imageUrl;
            
            setSelectedProduct({
            ...selectedProduct,
            imageUrl: uploadImageUrl
            });
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return(<>
        <div className='container'>
            <h2 className='text-start'>產品清單</h2>
            <div className='text-end'>
              <button className='btn btn-warning' type='button' onClick={()=>openModal({},"add")}>
                新增產品
              </button>
            </div>
            <table className='table'>
              <thead>
                <tr>
                  <th>產品名稱</th>
                  <th>分類</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>數量</th>
                  <th>單位</th>
                  <th>是否啟用</th>
                  <th>編輯</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product)=>{
                  return (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.category}</td>
                      <td>{product.origin_price}/元</td>
                      <td>{product.price}/元</td>
                      <td>{product.num}</td>
                      <td>{product.unit}</td>
                      <td>{product.is_enabled?'已啟用':'未啟用'}</td>
                      <td>
                        <div className='btn-group'>
                          <button type='button' className='btn btn-warning btn-sm' onClick={()=>openModal(product,'edit')}>編輯</button>
                          <button type='button' className='btn btn-danger btn-sm' onClick={()=>openModal(product,'delete')}>刪除</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
        </div>
        <ProductModal 
        closeModal={closeModal} 
        handleModalInputChange={handleModalInputChange} 
        handleImageChange={handleImageChange}
        handleAddImage={handleAddImage}
        handleRemoveImage={handleRemoveImage}
        deleteProduct={deleteProduct}
        updateProduct={updateProduct}
        handleFileChange={handleFileChange}
        selectedProduct={selectedProduct}
        modalType={modalType}
        productModalRef={productModalRef}
        />
    </>   
    )
}
ProductsPage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    pageInfo: PropTypes.object.isRequired,
    base_url: PropTypes.string.isRequired,
    api_path: PropTypes.string.isRequired,
};

export default ProductsPage