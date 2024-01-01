// main.go
package main

import (
	"strconv"
	"strings"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"time"
)

var db *gorm.DB

type Invoice struct {
	ID           uint       `gorm:"primary_key"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    *time.Time `sql:"index"`
	Name         string 
	MobileNo     string
	Email        string
	Address      string
	BillingType  string
	TotalPrice   float64
	Description  string 
	InvoiceItems []Item  // Adjust this line to reference the Item structure
}

type Item struct {
	ID           uint       `gorm:"primary_key"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    *time.Time `sql:"index"`
	Name         string
	UnitPrice    float64
	UnitQuantity int
	ItemCategory string
}

func main() {
	initDB()

	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	router.Use(cors.New(config))

	db.AutoMigrate(&Item{}, &Invoice{})

	router.GET("/items", getItems)
	router.POST("/items", addItem)
	router.PUT("/items/:id", updateItem)
	router.DELETE("/items/:id", deleteItem)

	router.POST("/invoices", addInvoice)

	router.Run(":8080")
}

// Initialize the database
func initDB() {
	var err error
	db, err = gorm.Open("postgres", "host=localhost port=5432 user=****** dbname=ABC_Pharmacy password=***** sslmode=disable") //********
	if err != nil {
		panic("Failed to connect to the database")
	}

	// Migrate the schema
	db.AutoMigrate(&Item{})
}

// CRUD operations for Items

func getItems(c *gin.Context) {
	var items []Item
	db.Find(&items)
	c.JSON(200, items)
}

func addItem(c *gin.Context) {
	var item Item
	c.BindJSON(&item)
	db.Create(&item)
	c.JSON(200, item)
}

func updateItem(c *gin.Context) {
	id := c.Params.ByName("id")
	var item Item
	if err := db.Where("id = ?", id).First(&item).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if err := c.BindJSON(&item); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	db.Save(&item)

	c.JSON(200, item)
}

func deleteItem(c *gin.Context) {
	id := c.Params.ByName("id")
	var item Item
	if err := db.Where("id = ?", id).First(&item).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	db.Delete(&item)

	c.JSON(200, gin.H{"id": id, "message": "deleted"})
}

// Function to get item name by ID
func getItemNameByID(itemID uint) string {
	var item Item
	db.Where("id = ?", itemID).First(&item)
	return item.Name
}

// Add an invoice
func addInvoice(c *gin.Context) {
	var invoice Invoice
	c.BindJSON(&invoice)

	// Calculate the total price based on selected items and quantities
	var totalPrice float64
	for _, item := range invoice.InvoiceItems {
		totalPrice += item.UnitPrice * float64(item.UnitQuantity)
	}
	invoice.TotalPrice = totalPrice

	// Concatenate the selected items and quantities into the Description field
	var descriptionBuilder strings.Builder
	for _, item := range invoice.InvoiceItems {
		descriptionBuilder.WriteString(fmt.Sprintf("%s - %dx%d, ", item.Name, item.UnitQuantity, item.UnitQuantity))
	}
	invoice.Description = descriptionBuilder.String()

	// Save the invoice to the database
	db.Create(&invoice)

	c.JSON(200, invoice)
}

// Function to reduce item quantity in the database
func reduceItemQuantity(itemID uint, quantity int) {
	var item Item
	if err := db.Where("id = ?", itemID).First(&item).Error; err != nil {
		fmt.Println("Error:", err)
		return
	}

	// Calculate the new quantity
	newQuantity := item.UnitQuantity - quantity

	// Update the item quantity in the database
	db.Model(&item).Update("unit_quantity", newQuantity)
}

// Function to convert string to float (if needed)
func ConvertToFloat(str string) float64 {
	f, err := strconv.ParseFloat(str, 64)
	if err != nil {
		return 0.0
	}
	return f
}
