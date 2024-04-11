FROM golang:1.22.1-alpine3.19

# Set the current working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files to the workspace
COPY go.mod ./
#COPY go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source from the current directory to the workspace
COPY . .

# Build the Go app
RUN go build -o main.exe .

# Expose port 9000 to the outside world
EXPOSE 9000

# Command to run the executable
CMD ["./main.exe"]