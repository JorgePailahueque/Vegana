document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            imageUrl: '',
            imageFile: '',
            valid: true,
            name: '',
            rules: [
                v => !!v || 'Field is required'
            ],
            editedIndex: -1,
            headers: [
                { text: 'Codigo', value: 'codigo' },
                { text: 'Producto', value: 'producto' },
                { text: 'Marca', value: 'marca' },
                { text: 'Categoria', value: 'categoria' },
                { text: 'Stock', value: 'stock' },
                { text: 'Precio', value: 'precio' },
                { text: 'Imagen', value: 'img', sortable: false },
                { text: 'Opciones', sortable: false, align: 'center' }
            ],
            dialog: false,
            product: {
                codigo: '',
                producto: '',
                marca: '',
                categoria: [],
                stock: '',
                precio: '',
                img: ''
            },
            marcas: ['AMANDIN', 'AQUASOLAR', 'BEAR', 'BIONA', 'BROTA', 'E NATURE', 'EDEN', 'KRAUS', 'OLAVE', 'PRIMAL', 'ROOBAR', 'SOUL BAR', 'SWEET FREEDOM', 'WILD MATE'],
            categorias: ['ABARROTES', 'ALIMENTOS DEPORTIVOS', 'BARRAS', 'CHIA', 'BEBIDAS VEGETALES', 'BEBIDAS VEGETALES Y JUGOS', 'CHOCOLATES Y CACAO', 'ENDULZANTES', 'HARINAS', 'MERMELADAS', 'ORGANICO', 'PROTEINAS', 'SALSAS DE CHOCOLATE', 'SIN GLUTEN', 'SNACKS Y BARRAS','SUPLEMENTOS', 'TE/INFUSIONES/CAFE'],
            formActualizar: false,
            idActualizar: -1,
            codigoEdit: '',
            productoEdit: '',
            marcaEdit: '',
            categoriaEdit: '',
            stockEdit: '',
            precioEdit: '',
            imgEdit: '',
            productos: [
                { codigo: "280001", producto: "MERMELADA DE FRUTILLA ORGANICA, 250 GRS", marca: 'BIONA', categoria: ['MERMELADAS', 'ORGANICO', 'SIN GLUTEN'], stock: "2", precio: "4190", img: "https://www.brotetienda.com/wp-content/uploads/2018/12/280001.jpg" },
                { codigo: "250002", producto: "YERBA MATE PIONERO, 500 GRS", marca: 'KRAUS', categoria: ['ABARROTES', 'CAFE Y YERBA MATE', 'SIN GLUTEN', 'TE/INFUSIONES/CAFE'], stock: "12", precio: "4290", img: "https://www.brotetienda.com/wp-content/uploads/2019/03/250002.jpg" },
                { codigo: "162000", producto: "SALSA DE CHOCOLATE NATURAL, 320 GRS", marca: 'SWEET FREEDOM', categoria: ['CHOCOLATES Y CACAO', 'ENDULZANTES', 'SALSAS DE CHOCOLATE', 'SIN GLUTEN'], stock: "8", precio: "7490", img: "https://www.brotetienda.com/wp-content/uploads/2018/07/55.png" },
                { codigo: "140010", producto: "BEBIDA DE ALMENDRA EN POLVO VEGGIMILK, 200 GRS", marca: 'AQUASOLAR', categoria: ['BEBIDAS VEGETALES', 'BEBIDAS VEGETALES Y JUGOS', 'PROTEINAS', 'SIN GLUTEN', 'SUPLEMENTOS'], stock: "8", precio: "6490", img: "https://www.brotetienda.com/wp-content/uploads/2018/07/87.png" },
                { codigo: "220028", producto: "BROWNIE BALL, 12 UNIDADES", marca: 'ROOBAR', categoria: ['ORGANICO', 'SIN GLUTEN', 'SNACKS Y BARRAS'], stock: "10", precio: "11990", img: "https://www.brotetienda.com/wp-content/uploads/2018/10/220028.jpg" },
                { codigo: "220014", producto: "BARRA DE MANZANA CANELA SOUL BAR, 25 GRS", marca: 'SOUL BAR', categoria: ['ALIMENTOS DEPORTIVOS', 'BARRAS', 'SNACKS Y BARRAS'], stock: "8", precio: "690", img: "https://www.brotetienda.com/wp-content/uploads/2018/07/145.png" },
                { codigo: "240012", producto: "PROTEÍNA DE CHIA, 300 GRS", marca: 'BROTA', categoria: ['CHIA', 'HARINAS', 'PROTEINAS', 'SUPLEMENTOS'], stock: "6", precio: "690", img: "https://www.brotetienda.com/wp-content/uploads/2018/12/240012.jpg" }
            ]
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Agregar Producto' : 'Editar Producto'
            }
        },
        methods: {
            editItem(item) {
                this.editedIndex = this.productos.indexOf(item)
                this.product = item
                this.dialog = true
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.product = {
                        codigo: '',
                        producto: '',
                        marca: '',
                        categoria: [],
                        stock: '',
                        precio: '',
                        img: ''
                    }
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.productos[this.editedIndex], this.product)
                } else {
                    this.product.img = 'https://www.brotetienda.com/wp-content/uploads/2018/07/55.png'
                    this.productos.push(this.product)
                }
                this.close()
            },
            deleteItem(item) {
                const index = this.productos.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.productos.splice(index, 1)
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.save()
                }
            },
            pickFile () {
                this.$refs.image.click ()
            },
            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.product.img = files[0].name
                    if(this.product.img.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.product.img = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            }
        
        }
    });
});
