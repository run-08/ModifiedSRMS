# Stage 1: Build the application
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# This will use the updated pom.xml to compile your code correctly
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copy the WAR file from the build stage
COPY --from=build /app/target/*.war app.war

# Port 1000 for StudentResultPage
EXPOSE 1000

# Start the service
ENTRYPOINT ["java", "-jar", "app.war"]