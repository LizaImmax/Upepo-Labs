'use client'

import { useState } from 'react'
import Link from 'next/link'

interface LabStep {
  id: number
  title: string
  description: string
  why: string
  command?: string
  hints: string[]
  checkpoints: string[]
}

const LAB_STEPS: LabStep[] = [
  {
    id: 1,
    title: 'Set Up Your Development Environment',
    description:
      'Install and configure the necessary tools for multi-cloud deployment including Terraform, AWS CLI, Azure CLI, and Google Cloud SDK.',
    why: 'Having all three cloud provider CLIs installed allows you to authenticate and deploy resources across AWS, Azure, and GCP from a single machine. Terraform provides infrastructure-as-code capabilities to manage resources declaratively.',
    command: `# Install Terraform
brew install terraform  # macOS
# OR
choco install terraform  # Windows

# Verify installation
terraform --version`,
    hints: [
      'Make sure you have administrator/sudo privileges for installations',
      'After installing each CLI, verify with --version commands',
      'Keep your CLI versions up to date for the latest features',
    ],
    checkpoints: [
      'Terraform CLI is installed and shows version 1.5+',
      'AWS CLI version 2.x is installed',
      'Azure CLI is installed and authenticated',
      'Google Cloud SDK is installed',
    ],
  },
  {
    id: 2,
    title: 'Configure Cloud Provider Credentials',
    description:
      'Set up authentication for AWS, Azure, and GCP using service accounts and access keys.',
    why: 'Terraform needs authenticated access to create, modify, and destroy resources in each cloud provider. Using service accounts with limited permissions follows the principle of least privilege.',
    command: `# AWS Configuration
aws configure
# Enter: Access Key ID, Secret Access Key, Region, Output format

# Azure Configuration
az login
az account set --subscription "YOUR_SUBSCRIPTION_ID"

# GCP Configuration
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID`,
    hints: [
      'Store credentials securely - never commit them to version control',
      'Use IAM roles with minimum required permissions',
      'Consider using environment variables for CI/CD pipelines',
      'For production, use cloud-native secret management services',
    ],
    checkpoints: [
      'AWS credentials are configured (check with: aws sts get-caller-identity)',
      'Azure subscription is active (check with: az account show)',
      'GCP project is set (check with: gcloud config list)',
      'All three CLIs can authenticate successfully',
    ],
  },
  {
    id: 3,
    title: 'Create Project Directory Structure',
    description:
      'Organize your Terraform code with a clean directory structure separating providers and shared modules.',
    why: 'A well-organized structure makes it easier to manage multi-cloud deployments, share common code through modules, and maintain separate state files for each cloud provider.',
    command: `mkdir multi-cloud-app && cd multi-cloud-app
mkdir -p terraform/{aws,azure,gcp,modules/app}
touch terraform/aws/main.tf
touch terraform/azure/main.tf
touch terraform/gcp/main.tf
touch terraform/modules/app/main.tf`,
    hints: [
      'Keep provider-specific code in separate directories',
      'Use modules for reusable components across clouds',
      'Consider using a .gitignore for Terraform state files',
    ],
    checkpoints: [
      'Directory structure is created',
      'Separate folders exist for each cloud provider',
      'Modules directory is ready for shared code',
      'Main.tf files are created in each provider folder',
    ],
  },
  {
    id: 4,
    title: 'Write Terraform Configuration for AWS',
    description:
      'Create a simple web application infrastructure on AWS using EC2, VPC, and Security Groups.',
    why: 'Starting with AWS allows you to establish the baseline architecture. EC2 provides compute, VPC handles networking, and Security Groups control traffic - these are fundamental building blocks.',
    command: `# terraform/aws/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "multi-cloud-demo-vpc"
    Lab  = "multi-cloud-deployment"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "public-subnet"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Allow HTTP/HTTPS traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  
  vpc_security_group_ids = [aws_security_group.web.id]
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Hello from AWS - Multi-Cloud Lab</h1>" > /var/www/html/index.html
              EOF
  
  tags = {
    Name = "multi-cloud-web-server"
  }
}

output "aws_public_ip" {
  value = aws_instance.web.public_ip
}`,
    hints: [
      'Use the latest Amazon Linux 2 AMI ID for your region',
      'T2.micro instances are free-tier eligible',
      'Security groups act as virtual firewalls',
      'User data scripts run on instance launch',
    ],
    checkpoints: [
      'Terraform configuration is syntactically correct',
      'VPC and subnet are properly configured',
      'Security group allows HTTP traffic',
      'Instance is configured with user data script',
    ],
  },
  {
    id: 5,
    title: 'Deploy to AWS',
    description: 'Initialize Terraform, plan the deployment, and apply the configuration to create resources on AWS.',
    why: 'The terraform workflow (init → plan → apply) ensures you review changes before applying them. This prevents accidental resource creation or deletion.',
    command: `cd terraform/aws

# Initialize Terraform (downloads providers)
terraform init

# Preview changes
terraform plan

# Apply configuration
terraform apply

# Type 'yes' when prompted`,
    hints: [
      'Always run terraform plan before apply',
      'Review the execution plan carefully',
      'Save plan output for audit trails: terraform plan -out=plan.tfplan',
      'Initial apply may take 2-3 minutes',
    ],
    checkpoints: [
      'Terraform initialized successfully',
      'Plan shows resources to be created',
      'Apply completed without errors',
      'Output shows the public IP address',
      'You can access the web server at http://PUBLIC_IP',
    ],
  },
  {
    id: 6,
    title: 'Write Terraform Configuration for Azure',
    description:
      'Create equivalent infrastructure on Azure using Virtual Network, VM, and Network Security Group.',
    why: 'Azure uses different resource names (Resource Groups, Virtual Networks, Network Security Groups) but the concepts are similar to AWS. This demonstrates multi-cloud portability.',
    command: `# terraform/azure/main.tf
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "multi-cloud-demo-rg"
  location = "East US"
}

resource "azurerm_virtual_network" "main" {
  name                = "demo-vnet"
  address_space       = ["10.1.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_subnet" "main" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.1.1.0/24"]
}

resource "azurerm_public_ip" "main" {
  name                = "demo-public-ip"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  allocation_method   = "Static"
}

resource "azurerm_network_security_group" "main" {
  name                = "demo-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "HTTP"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_network_interface" "main" {
  name                = "demo-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.main.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.main.id
  }
}

resource "azurerm_linux_virtual_machine" "main" {
  name                = "demo-vm"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_B1s"
  admin_username      = "azureuser"
  
  network_interface_ids = [
    azurerm_network_interface.main.id,
  ]

  admin_ssh_key {
    username   = "azureuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }

  custom_data = base64encode(<<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nginx
              echo "<h1>Hello from Azure - Multi-Cloud Lab</h1>" > /var/www/html/index.html
              systemctl start nginx
              systemctl enable nginx
              EOF
  )
}

output "azure_public_ip" {
  value = azurerm_public_ip.main.ip_address
}`,
    hints: [
      'Azure requires a Resource Group to organize all resources',
      'Generate SSH key if needed: ssh-keygen -t rsa -b 4096',
      'Standard_B1s is cost-effective for testing',
      'Custom data must be base64 encoded in Azure',
    ],
    checkpoints: [
      'Resource Group is defined',
      'Virtual Network has correct CIDR (10.1.0.0/16)',
      'NSG allows port 80',
      'VM is configured with SSH key',
    ],
  },
  {
    id: 7,
    title: 'Deploy to Azure',
    description: 'Deploy the Azure infrastructure using Terraform.',
    why: 'Deploying to a second cloud provider demonstrates infrastructure portability and helps you understand the differences in cloud provider APIs and resource models.',
    command: `cd terraform/azure

terraform init
terraform plan
terraform apply`,
    hints: [
      'Ensure SSH key exists before applying',
      'Azure deployments may take 3-5 minutes',
      'Note the public IP from the output',
    ],
    checkpoints: [
      'Resources created successfully in Azure portal',
      'Public IP is accessible',
      'Web server responds at http://AZURE_PUBLIC_IP',
      'Page shows "Hello from Azure"',
    ],
  },
  {
    id: 8,
    title: 'Write Terraform Configuration for GCP',
    description: 'Create infrastructure on Google Cloud Platform using Compute Engine and VPC.',
    why: 'GCP completes the multi-cloud trifecta. GCP uses projects as organizational units and has unique networking concepts like auto-mode VPCs.',
    command: `# terraform/gcp/main.tf
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = "YOUR_PROJECT_ID"
  region  = "us-central1"
  zone    = "us-central1-a"
}

resource "google_compute_network" "vpc" {
  name                    = "multi-cloud-demo-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "demo-subnet"
  ip_cidr_range = "10.2.0.0/24"
  region        = "us-central1"
  network       = google_compute_network.vpc.id
}

resource "google_compute_firewall" "web" {
  name    = "allow-http"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["web-server"]
}

resource "google_compute_instance" "web" {
  name         = "demo-web-server"
  machine_type = "e2-micro"
  zone         = "us-central1-a"

  tags = ["web-server"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network    = google_compute_network.vpc.id
    subnetwork = google_compute_subnetwork.subnet.id
    
    access_config {
      // Ephemeral public IP
    }
  }

  metadata_startup_script = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y nginx
    echo "<h1>Hello from GCP - Multi-Cloud Lab</h1>" > /var/www/html/index.html
    systemctl start nginx
    systemctl enable nginx
  EOF
}

output "gcp_public_ip" {
  value = google_compute_instance.web.network_interface[0].access_config[0].nat_ip
}`,
    hints: [
      'Replace YOUR_PROJECT_ID with your actual GCP project ID',
      'e2-micro is the free-tier eligible machine type',
      'Firewall rules use tags to target specific instances',
      'GCP uses startup scripts instead of user data',
    ],
    checkpoints: [
      'Project ID is correctly set',
      'VPC network is created (not auto-mode)',
      'Firewall allows HTTP traffic to tagged instances',
      'Instance has web-server tag',
    ],
  },
  {
    id: 9,
    title: 'Deploy to GCP',
    description: 'Deploy to Google Cloud Platform and verify all three clouds are running.',
    why: 'With all three deployments complete, you now have identical applications running across AWS, Azure, and GCP - demonstrating true multi-cloud capability.',
    command: `cd terraform/gcp

terraform init
terraform plan
terraform apply`,
    hints: [
      'Enable required GCP APIs if prompted',
      'First-time deployment may require API activation',
      'Check GCP console for resource creation',
    ],
    checkpoints: [
      'GCP resources created successfully',
      'Instance is running in Compute Engine',
      'Web server accessible at http://GCP_PUBLIC_IP',
      'All three clouds (AWS, Azure, GCP) show their respective pages',
    ],
  },
  {
    id: 10,
    title: 'Compare and Document Your Deployment',
    description:
      'Compare the architectures, costs, and performance across all three cloud providers. Take screenshots and document your findings.',
    why: 'Understanding the differences between cloud providers helps you make informed decisions about which cloud to use for specific workloads and cost optimization strategies.',
    command: `# Compare outputs
cd terraform/aws && terraform output
cd ../azure && terraform output
cd ../gcp && terraform output

# Check costs (example using AWS CLI)
aws ce get-cost-and-usage \\
  --time-period Start=2024-01-01,End=2024-01-31 \\
  --granularity MONTHLY \\
  --metrics "BlendedCost"`,
    hints: [
      'Take screenshots of each cloud console showing resources',
      'Document response times from each cloud',
      'Note any differences in deployment speed',
      'Compare pricing for similar instance types',
      'Screenshot your terminal showing successful outputs',
    ],
    checkpoints: [
      'All three deployments are documented with screenshots',
      'Response times are measured and recorded',
      'Cost estimates are calculated for each cloud',
      'Architecture diagrams are created (optional)',
      'Screenshots shared on LinkedIn/Twitter with #MultiCloud #UpepoLabs',
    ],
  },
  {
    id: 11,
    title: 'Clean Up Resources',
    description: 'Destroy all created resources to avoid ongoing charges.',
    why: 'Cloud resources cost money even when idle. Always clean up test resources to prevent unexpected bills. Terraform makes this easy with the destroy command.',
    command: `# Destroy AWS resources
cd terraform/aws
terraform destroy

# Destroy Azure resources
cd ../azure
terraform destroy

# Destroy GCP resources
cd ../gcp
terraform destroy`,
    hints: [
      'Run destroy in the reverse order of creation',
      'Review what will be destroyed before confirming',
      'Check cloud consoles to verify all resources are gone',
      'Save any important screenshots or outputs before destroying',
    ],
    checkpoints: [
      'All AWS resources destroyed',
      'All Azure resources destroyed',
      'All GCP resources destroyed',
      'Cloud console shows no remaining resources',
      'No unexpected charges on billing dashboards',
    ],
  },
]

export default function MultiCloudLabPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [screenshots, setScreenshots] = useState<{ [key: number]: string[] }>({})
  const [notes, setNotes] = useState<{ [key: number]: string }>({})

  const currentStepData = LAB_STEPS.find((step) => step.id === currentStep)
  const progress = (completedSteps.length / LAB_STEPS.length) * 100

  const toggleStepComplete = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter((id) => id !== stepId))
    } else {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const handleFileUpload = (stepId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file))
      setScreenshots((prev) => ({
        ...prev,
        [stepId]: [...(prev[stepId] || []), ...imageUrls],
      }))
    }
  }

  const removeScreenshot = (stepId: number, index: number) => {
    setScreenshots((prev) => ({
      ...prev,
      [stepId]: prev[stepId].filter((_, i) => i !== index),
    }))
  }

  const exportProgress = () => {
    const progressData = {
      labTitle: 'Multi-Cloud Deployment Lab',
      completedSteps: completedSteps.length,
      totalSteps: LAB_STEPS.length,
      progress: `${progress.toFixed(0)}%`,
      notes,
      completionDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(progressData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lab-progress.json'
    a.click()
  }

  if (!currentStepData) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="container-custom py-6">
          <Link
            href="/learn"
            className="mb-4 inline-flex items-center text-upepo-600 hover:text-upepo-700 dark:text-upepo-400"
          >
            ← Back to Labs
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                ☁️ Multi-Cloud Deployment Lab
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Deploy the same application across AWS, Azure, and GCP
              </p>
            </div>
            <div className="text-right">
              <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Progress: {completedSteps.length} / {LAB_STEPS.length}
              </div>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full bg-upepo-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Sidebar - Steps List */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 font-bold text-gray-900 dark:text-white">Lab Steps</h2>
              <div className="space-y-2">
                {LAB_STEPS.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                      currentStep === step.id
                        ? 'bg-upepo-50 text-upepo-900 dark:bg-upepo-900/20 dark:text-upepo-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        completedSteps.includes(step.id)
                          ? 'bg-green-500 text-white'
                          : currentStep === step.id
                            ? 'bg-upepo-600 text-white'
                            : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {completedSteps.includes(step.id) ? '✓' : step.id}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={exportProgress}
                className="mt-6 w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                📥 Export Progress
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Step Header */}
            <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-2 text-sm font-semibold text-upepo-600">
                    Step {currentStepData.id} of {LAB_STEPS.length}
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                    {currentStepData.title}
                  </h2>
                </div>
                <button
                  onClick={() => toggleStepComplete(currentStepData.id)}
                  className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                    completedSteps.includes(currentStepData.id)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {completedSteps.includes(currentStepData.id) ? '✓ Completed' : 'Mark Complete'}
                </button>
              </div>

              <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
                {currentStepData.description}
              </p>

              {/* Why This Step */}
              <div className="mb-6 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                <h3 className="mb-2 flex items-center gap-2 font-bold text-blue-900 dark:text-blue-300">
                  <span className="text-2xl">💡</span>
                  Why This Step?
                </h3>
                <p className="text-blue-800 dark:text-blue-200">{currentStepData.why}</p>
              </div>

              {/* Command/Code Block */}
              {currentStepData.command && (
                <div className="mb-6">
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-white">
                    Commands / Code
                  </h3>
                  <div className="relative">
                    <pre className="overflow-x-auto rounded-lg bg-gray-900 p-6 text-sm text-gray-100">
                      <code>{currentStepData.command}</code>
                    </pre>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentStepData.command!)
                        alert('Code copied to clipboard!')
                      }}
                      className="absolute right-4 top-4 rounded bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              {/* Hints */}
              <div className="mb-6">
                <h3 className="mb-3 font-bold text-gray-900 dark:text-white">💡 Hints</h3>
                <ul className="space-y-2">
                  {currentStepData.hints.map((hint, index) => (
                    <li
                      key={index}
                      className="flex gap-3 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200"
                    >
                      <span className="flex-shrink-0">💡</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checkpoints */}
              <div className="mb-6">
                <h3 className="mb-3 font-bold text-gray-900 dark:text-white">
                  ✓ Checkpoints
                </h3>
                <ul className="space-y-2">
                  {currentStepData.checkpoints.map((checkpoint, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="flex-shrink-0 text-green-500">✓</span>
                      <span>{checkpoint}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Screenshot Upload */}
              <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-600">
                <h3 className="mb-3 font-bold text-gray-900 dark:text-white">
                  📸 Document Your Progress
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Upload screenshots to document your work and share with your network
                </p>

                <label className="btn-primary mb-4 inline-block cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(currentStepData.id, e)}
                    className="hidden"
                  />
                  📤 Upload Screenshots
                </label>

                {screenshots[currentStepData.id]?.length > 0 && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {screenshots[currentStepData.id].map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Screenshot ${index + 1}`}
                          className="h-48 w-full rounded-lg object-cover"
                        />
                        <button
                          onClick={() => removeScreenshot(currentStepData.id, index)}
                          className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <h3 className="mb-3 font-bold text-gray-900 dark:text-white">📝 Your Notes</h3>
                <textarea
                  value={notes[currentStepData.id] || ''}
                  onChange={(e) =>
                    setNotes((prev) => ({ ...prev, [currentStepData.id]: e.target.value }))
                  }
                  placeholder="Add notes, observations, or things to remember..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 p-4 focus:border-upepo-500 focus:outline-none focus:ring-2 focus:ring-upepo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50"
              >
                ← Previous Step
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(LAB_STEPS.length, currentStep + 1))}
                disabled={currentStep === LAB_STEPS.length}
                className="btn-primary disabled:opacity-50"
              >
                Next Step →
              </button>
            </div>

            {/* Completion Message */}
            {completedSteps.length === LAB_STEPS.length && (
              <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-8 text-center text-white">
                <div className="mb-4 text-6xl">🎉</div>
                <h2 className="mb-4 text-3xl font-bold">Congratulations!</h2>
                <p className="mb-6 text-lg">
                  You've completed the Multi-Cloud Deployment Lab! Share your achievement with your network.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      'Just completed the Multi-Cloud Deployment Lab on @UpepoLabs! 🚀 Deployed the same app across AWS, Azure, and GCP. #MultiCloud #CloudEngineering #UpepoLabs'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-green-600 hover:bg-gray-100"
                  >
                    Share on Twitter
                  </a>
                  <Link href="/community" className="btn-secondary border-white text-white hover:bg-white/10">
                    View More Labs
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
