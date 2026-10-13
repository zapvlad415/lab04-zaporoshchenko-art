// Лабораторна робота № 4. Варіант 23. Зоомагазин.
// Підсумкова версія після перевірок Prettier та ESLint.
const products = [
	{
		id: 1,
		name: 'Корм для котів',
		category: 'Корм',
		price: 120,
		stock: 18,
		unit: 'пакет',
	},
	{
		id: 2,
		name: 'Корм для собак',
		category: 'Корм',
		price: 180,
		stock: 9,
		unit: 'пакет',
	},
	{
		id: 3,
		name: 'Іграшка для котів',
		category: 'Іграшки',
		price: 80,
		stock: 25,
		unit: 'шт',
	},
	{
		id: 4,
		name: 'Повідок',
		category: 'Аксесуари',
		price: 150,
		stock: 6,
		unit: 'шт',
	},
	{
		id: 5,
		name: 'Миска',
		category: 'Аксесуари',
		price: 95,
		stock: 13,
		unit: 'шт',
	},
	{
		id: 6,
		name: 'Наповнювач',
		category: 'Гігієна',
		price: 210,
		stock: 11,
		unit: 'пакет',
	},
	{
		id: 7,
		name: 'М’ячик для собак',
		category: 'Іграшки',
		price: 65,
		stock: 30,
		unit: 'шт',
	},
	{
		id: 8,
		name: 'Шампунь',
		category: 'Гігієна',
		price: 135,
		stock: 4,
		unit: 'флакон',
	},
	{
		id: 9,
		name: 'Вітаміни',
		category: 'Догляд',
		price: 240,
		stock: 7,
		unit: 'упаковка',
	},
]
const shopSettings = {
	title: 'Зоомагазин Друзі',
	'max-items': 50,
	'currency': 'UAH',
	region: 'Україна',
	active: true,
}
const smallObject = {code: 7}
const simpleObject = {label: 'Тест'}
const spacedObject = {label: 'Приклад'}
const extraItems = ['Корм', 'Іграшки', 'Аксесуари']
const priceNotes = ["I'm here", 'Ціни наведено в гривнях']
const findProduct = (id) => products.find((p) => p.id === id)
const inStock = (item) => item.stock > 0
const productNames = () => products.map((p) => p.name)
const totalValue = (items) =>
	items.reduce((sum, p) => sum + p.price * p.stock, 0)
function formatMoney(value) {
	return value.toFixed(2) + ' грн'
}
function getCategoryName(category) {
	switch (category) {
		case 'Корм':
			return 'Харчування'
		case 'Іграшки':
			return 'Розваги'
		case 'Аксесуари':
			return 'Приладдя'
		case 'Гігієна':
			return 'Чистота'
		default:
			return 'Інше'
	}
}
function getProductsByCategory(category) {
	return products.filter((item) => item.category === category)
}
function getLowStockProducts(limit) {
	return products.filter((item) => item.stock < limit)
}
function getStockStatus(stock) {
	if (stock > 10) return 'Достатньо'
	if (stock > 0) return 'Мало'
	return 'Немає'
}
function getSaleTag(product) {
	if (product.price > 200) return 'Преміум'
	return 'Стандарт'
}
function getBasicPrice(product, quantity) {
	return product.price * quantity
}
function getCartSubtotal(cart) {
	let result = 0
	for (const position of cart) {
		const product = findProduct(position.id)
		if (product) {
			result += getBasicPrice(product, position.quantity)
		}
	}
	return result
}
function calculateDiscount(subtotal, discountRate) {
	// Виправлено Л1: використовуємо передану ставку знижки.
	return subtotal * discountRate
}
function calculateDelivery(subtotal) {
	// Виправлено Л2: від 300 грн доставка безкоштовна.
	return subtotal >= 300 ? 0 : 45
}
function calculateOrder(cart, discountRate, customer) {
	const {customerName, streetAddress, city, deliveryMethod} =
		customer
	const subtotal = getCartSubtotal(cart)
	const discount = calculateDiscount(subtotal, discountRate)
	const delivery = calculateDelivery(subtotal)
	const finalTotal = subtotal - discount + delivery
	return {
		customerName,
		streetAddress,
		city,
		deliveryMethod,
		subtotal,
		discount,
		delivery,
		finalTotal,
	}
}
function printProduct(product) {
	console.log(
		`${product.id}. ${product.name} — ${formatMoney(product.price)}`
	)
}
function printCatalog() {
	for (let i = 0; i < products.length; i++) {
		printProduct(products[i])
	}
}
function printStockSummary() {
	let stockCount = 0
	let lineCount = 0
	for (const product of products) {
		stockCount += product.stock
		lineCount += 1
	}
	console.log('Позицій каталогу: ' + lineCount)
	console.log('Одиниць на складі: ' + stockCount)
}
function printOrder(order) {
	console.log(`Клієнт: ${order.customerName}`)
	console.log(`Місто: ${order.city}`)
	console.log(`Адреса: ${order.streetAddress}`)
	console.log(`Спосіб доставки: ${order.deliveryMethod}`)
	console.log('Сума кошика: ' + formatMoney(order.subtotal))
	console.log('Знижка: ' + formatMoney(order.discount))
	console.log('Доставка: ' + formatMoney(order.delivery))
	console.log('До сплати: ' + formatMoney(order.finalTotal))
}
function checkOrderStatus(sent) {
	if (!sent) {
		return 'Очікує відправлення'
	}
	return 'Відправлено'
}
function getMessage(ready) {
	if (ready) {
		return 'Замовлення готове'
	}
	return 'Замовлення не готове'
}
function countPopularItems(limit) {
	let amount = 0
	for (const product of products) {
		if (product.stock > limit) {
			amount += 1
		}
	}
	return amount
}
function makeSuggestion(product, minStock) {
	return product.stock < minStock
		? 'Потрібно замовити'
		: 'Запас достатній'
}
function getSummaryLine(name, category) {
	return name + ' / ' + category
}
function inspectCart(cart) {
	let ok = true
	for (const position of cart) {
		const item = findProduct(position.id)
		if (!item || item.stock < position.quantity) {
			ok = false
		}
	}
	return ok
}
function isPremium(product) {
	return product.price > 200
}
function specialPrice(price, quantity, costs) {
	const {discount, tax, delivery, extra} = costs
	return price * quantity - discount + tax + delivery + extra
}
function veryLongCondition(product) {
	const valid =
		(product.price > 50 &&
			product.stock > 0 &&
			product.name.length > 2) ||
		product.category === 'Корм'
	return valid
}
function showBusinessNote() {
	console.log(priceNotes[1])
}
const debugMarker = 3
function listCategories() {
	return extraItems.join(', ')
}
function getDefaultSettings() {
	return shopSettings.title + ' (' + shopSettings.region + ')'
}
function getDisplayTitle() {
	return (
		smallObject.code +
		' / ' +
		simpleObject.label +
		' / ' +
		spacedObject.label +
		' / ' +
		debugMarker
	)
}
function getInventorySnapshot() {
	return products.map((product) => ({
		name: product.name,
		quantity: product.stock,
	}))
}
function runReport() {
	console.log('=== ЗВІТ ЗООМАГАЗИНУ ===')
	console.log('Магазин: ' + getDefaultSettings())
	console.log('Назва категорій: ' + listCategories())
	console.log('Товарів у каталозі: ' + products.length)
	console.log('Назва першого товару: ' + productNames()[0])
	console.log(
		'Загальна вартість запасів: ' +
			formatMoney(totalValue(products))
	)
	console.log(
		'Товарів з малим запасом: ' + getLowStockProducts(10).length
	)
	console.log(
		'Товарів у категорії Корм: ' +
			getProductsByCategory('Корм').length
	)
	console.log(
		'Статус першого товару: ' + getStockStatus(products[0].stock)
	)
	console.log(
		'Тип першого товару: ' + getCategoryName(products[0].category)
	)
	console.log('Позначка товару: ' + getSaleTag(products[0]))
	console.log('Популярних позицій: ' + countPopularItems(10))
	console.log(
		'Підказка закупівлі: ' + makeSuggestion(products[7], 5)
	)
	console.log(
		'Картка: ' +
			getSummaryLine(products[0].name, products[0].category)
	)
	console.log('Статус замовлення: ' + checkOrderStatus(false))
	console.log('Перевірка заявки: ' + getMessage(true))
	console.log(
		'Приклад знижки: ' +
			formatMoney(
				specialPrice(100, 2, {
					discount: 10,
					tax: 0,
					delivery: 0,
					extra: 0,
				})
			)
	)
	console.log('Технічна мітка: ' + getDisplayTitle())
	console.log('Позицій у знімку: ' + getInventorySnapshot().length)
	console.log('Наявність першого товару: ' + inStock(products[0]))
	console.log(
		'Преміум-товарів: ' + products.filter(isPremium).length
	)
	console.log('Замовлення допустиме: ' + inspectCart(selectedCart))
	console.log(
		'Умови продажу виконано: ' + veryLongCondition(products[0])
	)
	showBusinessNote()
	printStockSummary()
	console.log('=== КОШИК ПОКУПЦЯ ===')
	printOrder(orderDetails)
	console.log('=== КАТАЛОГ ===')
	printCatalog()
}

const selectedCart = [
	{id: 1, quantity: 2},
	{id: 3, quantity: 1},
]
const customer = {
	customerName: 'Марія Іваненко',
	streetAddress: 'вул. Шевченка, 12, квартира 5',
	city: 'Запоріжжя',
	deliveryMethod: "кур'єрська доставка до дверей",
}
const orderDetails = calculateOrder(selectedCart, 0.1, customer)
runReport()
